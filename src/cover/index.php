<?php

class Cover extends PRC_Block_Library_Primitives {
	public static $block_name = 'core/cover';
	public static $block_json = null;
	public static $editor_script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/cover/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'render_block', array( $this, 'render' ), 10, 2 );
		}
	}

	public function init_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	public function register_editor_assets() {
		if ( !function_exists('jetpack_is_mobile') ) {
			return;
		}
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * Register additional attributes for cover block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'mobileUrl', $metadata['attributes'] ) ) {
			$metadata['attributes']['mobileUrl'] = array(
				'type'    => 'string',
			);
		}

		if ( ! array_key_exists( 'mobileId', $metadata['attributes'] ) ) {
			$metadata['attributes']['mobileId'] = array(
				'type'    => 'number',
			);
		}

		return $metadata;
	}

	/**
	 * Renders the mobile image for the cover block, when on mobile.
	 * @uses jetpack_is_mobile()
	 */
	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		if ( !function_exists('jetpack_is_mobile') ) {
			return $block_content;
		}

		$mobile_image_id = array_key_exists('mobileId', $block['attrs']) ? $block['attrs']['mobileId'] : false;
		$mobile_image = $mobile_image_id ? wp_get_attachment_image_src( $mobile_image_id, 'full' ) : false;
		$mobile_image = $mobile_image ? $mobile_image[0] : false;

		// Replace the image with the mobile image if on a mobile device.
		$image_attrs = null;
		if ( jetpack_is_mobile() && preg_match( '/<img(.*?)>/', $block_content, $matches ) && false !== $mobile_image ) {
			$image_attrs = $matches[1];
			$image_attrs = preg_replace( '/src=".*?"/', 'src="' . $mobile_image . '"', $image_attrs );
			$block_content = preg_replace( '/<img(.*?)>/', '<img' . $image_attrs . '>', $block_content );
		}

		return $block_content;
	}
}
