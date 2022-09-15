<?php

class Column extends PRC_Block_Library_Primitives {
	public static $block_name = 'core/column';
	public static $block_json = null;
	public static $editor_style_handle = null;
	public static $editor_script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/column/block.json';
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
		self::$editor_style_handle = register_block_style_handle( self::$block_json, 'editorStyle' );
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	public function register_editor_assets() {
		wp_enqueue_style( self::$editor_style_handle );
		wp_enqueue_script( self::$editor_script_handle );
	}

	/**
	 * Register CSS grid attributes for core/column block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		// Grid Start:
		if ( ! array_key_exists( 'gridStart', $metadata['attributes'] ) ) {
			$metadata['attributes']['gridStart'] = array(
				'type'    => 'integer'
			);
		}

		if ( ! array_key_exists( 'tabletGridStart', $metadata['attributes'] ) ) {
			$metadata['attributes']['tabletGridStart'] = array(
				'type'    => 'integer'
			);
		}

		if ( ! array_key_exists( 'mobileGridStart', $metadata['attributes'] ) ) {
			$metadata['attributes']['mobileGridStart'] = array(
				'type'    => 'integer'
			);
		}
		// Grid Span:
		if ( ! array_key_exists( 'gridSpan', $metadata['attributes'] ) ) {
			$metadata['attributes']['gridSpan'] = array(
				'type'    => 'integer'
			);
		}

		if ( ! array_key_exists( 'tabletGridSpan', $metadata['attributes'] ) ) {
			$metadata['attributes']['tabletGridSpan'] = array(
				'type'    => 'integer'
			);
		}

		if ( ! array_key_exists( 'mobileGridSpan', $metadata['attributes'] ) ) {
			$metadata['attributes']['mobileGridSpan'] = array(
				'type'    => 'integer'
			);
		}

		return $metadata;
	}

	public function add_settings(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['uses_context'] = array_merge(
				array_key_exists('uses_context', $settings) ? $settings['uses_context'] : array(),
				array('core/columns/useCSSGrid'),
			);
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					'core/column/gridStart' => 'gridStart',
					'core/column/gridSpan' => 'gridSpan',
					'core/column/tabletGridStart' => 'tabletGridStart',
					'core/column/tabletGridSpan' => 'tabletGridSpan',
					'core/column/mobileGridStart' => 'mobileGridStart',
					'core/column/mobileGridSpan' => 'mobileGridSpan',
				)
			);
		}
		return $settings;
	}

	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		// Defaults to false.
		$wrap_column_contents_classname = apply_filters('prc_block_library_primitives_column_wrap', false, $block);
		if ( false !== $wrap_column_contents_classname ) {
			$classname = 'wp-block-column__inner-container' . ' ' . $wrap_column_contents_classname;
			$inner_blocks = $block['innerBlocks'];
			$inner_blocks_content = null;
			foreach ( $inner_blocks as $inner_block ) {
				$inner_blocks_content .= render_block( $inner_block );
			}
			$block_content = sprintf('<div class="%s">%s</div>', $classname, $inner_blocks_content);
		}

		return $block_content;
	}
}
