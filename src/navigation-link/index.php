<?php
class Navigation_Link extends PRC_Block_Library_Primitives {
	public static $block_name = 'core/navigation-link';
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/navigation-link/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_action( 'enqueue_block_editor_assets', array($this, 'register') );
			add_filter( 'render_block', array($this, 'render_callback'), 10, 2 );
		}
	}

	/**
	 * Register additional attributes for navigation-link block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		// You can direct the icon to be a specific one off file.
		if ( ! array_key_exists( 'iconId', $metadata['attributes'] ) ) {
			$metadata['attributes']['iconId'] = array(
				'type'    => 'integer'
			);
		}
		// Otherwise, if you have an icon library you'd like to add you can add that here.
		// There are multiple ways you could add your icon from this attribute.
		// One way would be to use this slug to get a specific SVG from your library and then output that,
		// or you could use it to add a classname to the icon and use a CSS based library to output the icon.
		if ( ! array_key_exists( 'iconSlug', $metadata['attributes'] ) ) {
			$metadata['attributes']['iconSlug'] = array(
				'type'    => 'string'
			);
		}

		return $metadata;
	}

	public function register() {
		self::$script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		$icon_library = apply_filters( 'prc_icon_library', false );
		if ( false !== $icon_library ) {
			// Set default
			array_unshift( $icon_library, array(
				'label' => 'None',
				'value' => ''
			) );
			wp_localize_script(
				self::$script_handle,
				'prcIconLibrary',
				$icon_library
			);
		}
		wp_enqueue_script( self::$script_handle );
	}

	public function get_icon( $icon_slug ) {
		return apply_filters( 'prc_icon_library_from_slug', $icon_slug );
	}

	public function render_callback( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$icon_id = is_array($block['attrs']) && array_key_exists('iconId', $block['attrs']) ? $block['attrs']['iconId'] : false;
		$icon_slug = is_array($block['attrs']) && array_key_exists('iconSlug', $block['attrs']) ? $block['attrs']['iconSlug'] : false;

		$icon = false;
		if ( $icon_id ) {
			$icon = wp_get_attachment_image_src( $icon_id, 'thumbnail' );
			$icon = "<img src='{$icon[0]}' width='{$icon[0]}' height='{$icon[2]}' alt='{$block['attrs']['label']}'/>";
		} elseif ( $icon_slug ) {
			$icon = $this->get_icon( $icon_slug );
		}
		if ( false !== $icon ) {
			$pattern = '/<span class="wp-block-navigation-item__label">(.*?)<\/span>/';
			$block_content = preg_replace( $pattern, $icon, $block_content );
			$block_content = str_replace( 'wp-block-navigation-item wp-block-navigation-link', 'wp-block-navigation-item wp-block-navigation-link has-icon', $block_content );
		}

		return $block_content;
	}
}
