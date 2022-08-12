<?php
// Change the column rendering to grab innerblocks and re-do the render callback so block wrapper and attributes are handled server side.

class Column extends PRC_Core_Block_Library {
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_CORE_BLOCK_LIBRARY_DIR . '/build/column/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action('enqueue_block_editor_assets', array($this, 'register'));

			add_action('admin_init', function(){
				do_action('qm/debug', "Hello from PRC_Core_Block_Library::init_blocks()" . print_r(self::$block_json, true));
			});
		}
	}

	public function register() {
		self::$script_handle = register_block_script_handle(self::$block_json, 'editorScript');
		wp_enqueue_script( self::$script_handle );
	}
}
