<?php

class Layout_Grid_Column extends PRC_Block_Library_Primitives {
	public static $path = null;
	public static $block_name = 'prc-block/layout-grid-column';
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			self::$path = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/layout-grid-column';
			self::$block_json = wp_json_file_decode(
				self::$path . '/block.json',
				array( 'associative' => true )
			);
			self::$block_json['file'] = wp_normalize_path( realpath( self::$path . '/block.json' ) );

			add_action( 'init', array($this, 'register') );
		}
	}

	public function render_column_callback( $attributes, $content, $block ) {
		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			get_block_wrapper_attributes(array()),
			$content,
		);
	}

	public function register() {
		$block = register_block_type_from_metadata(
			self::$path,
			array(
				'render_callback' => array($this, 'render_column_callback'),
			)
		);
		do_action('qm/debug', 'column ' . print_r($block, true));
	}
}

