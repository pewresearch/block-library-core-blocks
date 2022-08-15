<?php
// Change the column rendering to grab innerblocks and re-do the render callback so block wrapper and attributes are handled server side.

class Column extends PRC_Core_Block_Library {
	public static $block_name = 'core/column';
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_CORE_BLOCK_LIBRARY_DIR . '/build/column/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'block_type_metadata_settings', array( $this, 'add_settings' ), 100, 2 );
			add_action('enqueue_block_editor_assets', array($this, 'register'));
		}
	}

	/**
	 * Register additional attributes for column block.
	 * - "minWidth" is a custom string attribute that is used to set the min-width in whatever unit desired of the column.
	 * - "fillWidth" is a custom boolean attribute that is used to set the column to fill the width of the container.
	 *
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'minWidth', $metadata['attributes'] ) ) {
			$metadata['attributes']['minWidth'] = array(
				'type'    => 'string'
			);
		}

		if ( ! array_key_exists( 'fillWidth', $metadata['attributes'] ) ) {
			$metadata['attributes']['fillWidth'] = array(
				'type'    => 'boolean',
				'default' => false
			);
		}

		return $metadata;
	}

	/**
	 * Register additional settings for column block.
	 * - Add `width` to block context.
	 *
	 * @param mixed $settings
	 * @param mixed $block
	 * @return mixed
	 */
	public function add_settings(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					'core/column/width' => 'width'
				)
			);
		}
		return $settings;
	}

	public function register() {
		self::$script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		wp_enqueue_script( self::$script_handle );
	}

	public function render_callback() {

	}
}
