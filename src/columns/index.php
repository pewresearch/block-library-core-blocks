<?php

class Columns extends PRC_Block_Library_Primitives {
	public static $block_name = 'core/columns';
	public static $block_json = null;
	public static $style_handle = null;
	public static $editor_script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/columns/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'block_type_metadata_settings', array( $this, 'add_settings' ), 100, 2 );
			add_filter( 'render_block', array( $this, 'render' ), 10, 2 );
		}
	}

	public function init_assets() {
		self::$style_handle = register_block_style_handle( self::$block_json, 'style' );
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	public function register_editor_assets() {
		wp_enqueue_style( self::$style_handle );
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * Register additional attributes for group block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'useCSSGrid', $metadata['attributes'] ) ) {
			$metadata['attributes']['useCSSGrid'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		if ( ! array_key_exists( 'enableVerticalDivider', $metadata['attributes'] ) ) {
			$metadata['attributes']['enableVerticalDivider'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		return $metadata;
	}

	public function add_settings(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					'core/columns/useCSSGrid' => 'useCSSGrid',
				)
			);
		}
		return $settings;
	}

	// public function enqueue_view_script() {
	// 	if ( has_block(self::$block_name) && !is_admin() ) {
	// 		// $is_sticky = is_array($block['attrs']) && array_key_exists('isSticky', $block['attrs']) ? $block['attrs']['isSticky'] : false;
	// 		// $responsive_attach_id = is_array($block['attrs']) && array_key_exists('responsiveAttachId', $block['attrs']) ? $block['attrs']['responsiveAttachId'] : false;
	// 		// $responsive_threshold = is_array($block['attrs']) && array_key_exists('responsiveThreshold', $block['attrs']) ? $block['attrs']['responsiveThreshold'] : false;
	// 		// if ( $is_sticky || $responsive_attach_id || $responsive_threshold ) {
	// 			wp_enqueue_script( self::$view_script_handle );
	// 		// }
	// 	}
	// }

	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		return $block_content;
	}
}
