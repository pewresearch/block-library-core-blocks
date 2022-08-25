<?php

class Layout_Grid extends PRC_Block_Library_Primitives {
	public static $path = null;
	public static $block_name = 'prc-block/layout-grid';
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			self::$path = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/grid';
			self::$block_json = wp_json_file_decode(
				self::$path . '/block.json',
				array( 'associative' => true )
			);
			self::$block_json['file'] = wp_normalize_path( realpath( self::$path . '/block.json' ) );

			add_action( 'init', array($this, 'register') );

			// Ensures this block can be used in site editor so that templates can offer up content inside as an excerpt.
			add_filter(
				'excerpt_allowed_wrapper_blocks',
				function( $allowed_wrapper_blocks ) {
					return array_merge( $allowed_wrapper_blocks, array( 'prc-block/layout-grid', 'prc-block/layout-grid-column' ) );
				}
			);
		}
	}

	public function render_grid_callback( $attributes, $content, $block ) {
		if ( is_admin() ) {
			return $content;
		}

		$css_classes = apply_filters( 'prc_block_library_primitive_grid_classnames', array(), $attributes, $block );

		$attrs = array(
			'class' => $css_classes,
		);

		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			get_block_wrapper_attributes($attrs),
			$content,
		);
	}

	public function register() {
		$block = register_block_type_from_metadata(
			self::$path,
			array(
				'render_callback' => array($this, 'render_grid_callback'),
			)
		);
		do_action('qm/debug', 'grid ' . print_r($block, true));
	}
}

