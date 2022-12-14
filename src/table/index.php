<?php
// Modify the core/table block.
// See: https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/table/index.php
namespace PRC;

/**
 * Table block utilities: adds CSV import to core/table block.
 * @package PRC
 */
class Table extends PRC_Block_Library_Core_Blocks {
	public static $block_name = 'core/table';
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_CORE_BLOCKS_DIR . '/build/table/block.json';
			self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_filter( 'upload_mimes', array( $this, 'allow_csv_mime_type' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'register_editor_assets' ) );
		}
	}

	public function init_assets() {
		$script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		if( false !== $script_handle ) {
			self::$script_handle = $script_handle;
		}
	}

	public function allow_csv_mime_type( $mimes ) {
		$mimes['csv'] = 'text/csv';
		return $mimes;
	}

	public function register_editor_assets() {
		wp_enqueue_script( self::$script_handle );
	}
}
