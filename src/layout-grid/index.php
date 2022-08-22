<?php

class Layout_Grid extends PRC_Block_Library_Primitives {
	public static $block_name = 'prc-block-library/layout-grid'; // -column
	public static $grid_block_json = null;
	public static $grid_script_handle = null;
	public static $column_block_json = null;
	public static $column_script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$path = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/layout-grid';
			self::$grid_block_json = wp_json_file_decode( $path . '/grid/block.json', array( 'associative' => true ) );
			self::$grid_block_json['file'] = wp_normalize_path( realpath( $path . '/grid/block.json' ) );

			self::$column_block_json = wp_json_file_decode( $path . '/column/block.json', array( 'associative' => true ) );
			self::$column_block_json['file'] = wp_normalize_path( realpath( $path . '/column/block.json' ) );

			add_action('init', array($this, 'register'));

			add_filter(
				'excerpt_allowed_wrapper_blocks',
				function( $allowed_wrapper_blocks ) {
					return array_merge( $allowed_wrapper_blocks, array( 'prc-core-block-library/layout-grid', 'prc-core-block-library/layout-grid-column' ) );
				}
			);
		}
	}

	public function render_grid_block_callback( $attributes, $content, $block ) {
		// $this->render_grid_column_block();
		// $css_classes = apply_filters( 'prc_block_library_primitives_layout_grid_css_classes', array(), $attributes, $block );
		return $content;
	}

	public function render_column_block_callback( $attributes, $content, $block ) {
		return $content;
	}

	public function register() {
		$grid_block = register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/layout-grid/grid',
			array(
				'render_callback' => array($this, 'render_grid_block_callback'),
			)
		);
		$column_block = register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/layout-grid/column',
			array(
				'render_callback' => array($this, 'render_column_block_callback'),
			)
		);

		do_action('qm/debug', print_r(array(
			'grid_block' => $grid_block,
			'column_block' => $column_block,
		), true));
	}
}

