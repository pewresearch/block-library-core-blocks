<?php
namespace PRC;

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
			add_filter( 'render_block', array( $this, 'render' ), 101, 2 );
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

		if ( ! array_key_exists( 'enableDivider', $metadata['attributes'] ) ) {
			$metadata['attributes']['enableDivider'] = array(
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

	public function get_vertical_divider_style($block) {
		$style = '';
		// I would like to do a check for if this columns block has divider enabled but the attr is not passing through for some reason, this more verbose option works for now.
		if ( array_key_exists('style', $block['attrs']) && array_key_exists('spacing', $block['attrs']['style']) && array_key_exists('blockGap', $block['attrs']['style']['spacing']) ) {
			$block_gap = (int) str_replace('px', '', $block['attrs']['style']['spacing']['blockGap']);
			$style = '.wp-block-columns.is-css-grid.has-divider > .wp-block-column:not(:first-of-type):not(.is-selected):not(.is-highlighted):not(.is-hovered):after {left: -' . ($block_gap  / 2). 'px!important;}';
		}
		return $style;

	}

	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		wp_enqueue_style( self::$style_handle );

		wp_add_inline_style(
			self::$style_handle,
			$this->get_vertical_divider_style( $block )
		);

		return $block_content;
	}
}
