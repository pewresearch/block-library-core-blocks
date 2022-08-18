<?php
class Home_Link extends PRC_Core_Block_Library {
	public static $block_name = 'core/home-link';
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_CORE_BLOCK_LIBRARY_DIR . '/build/home-link/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_action( 'enqueue_block_editor_assets', array($this, 'register') );
			add_filter( 'render_block', array($this, 'render_callback'), 10, 2 );
		}
	}

	/**
	 * Register additional attributes for home-link block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'iconId', $metadata['attributes'] ) ) {
			$metadata['attributes']['iconId'] = array(
				'type'    => 'integer'
			);
		}
		if ( ! array_key_exists( 'iconSlug', $metadata['attributes'] ) ) {
			$metadata['attributes']['iconSlug'] = array(
				'type'    => 'string'
			);
		}

		return $metadata;
	}

	public function register() {
		self::$script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		$icon_library = apply_filters( 'prc_cbl__icon__library', false );
		if ( false !== $icon_library ) {
			// Set default
			array_unshift( $icon_library, array(
				'label' => 'None',
				'value' => ''
			) );
			wp_localize_script(
				self::$script_handle,
				'prcCBLIconLibrary',
				$icon_library
			);
		}
		wp_enqueue_script( self::$script_handle );
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
			$icon = apply_filters( 'prc_cbl__icon__return_slug', $icon_slug );
		}
		if ( false !== $icon ) {
			$pattern = '/<a class="wp-block-home-link__content wp-block-navigation-item__content" rel="home" href="(.*)">(.*)<\/a>/';
			$replacement = '<a class="wp-block-home-link__content wp-block-navigation-item__content" rel="home" href="$1">' . $icon . '</a>';
			$block_content = preg_replace( $pattern, $replacement, $block_content );
			$block_content = str_replace( 'wp-block-navigation-item wp-block-home-link', 'wp-block-navigation-item wp-block-home-link has-icon', $block_content );
		}

		return $block_content;
	}
}
