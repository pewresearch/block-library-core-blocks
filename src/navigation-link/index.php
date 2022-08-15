<?php
// navigation link needs mulitple styles
// one style should change the sub menu to like a sub tree view
// attribute toggle to allow for changing the url to a hashed url when you open a sub menu so a visitor can share that pre-opened.
//// ability to set a icon which would hide the label and show the icon instead.
// A new sub  block or ability for navigation links to also have an expand button, i guess this is similair to sub tree view but styled slightly different.

class Navigation_Link extends PRC_Core_Block_Library {
	public static $block_name = 'core/navigation-link';
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_CORE_BLOCK_LIBRARY_DIR . '/build/navigation-link/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_action( 'enqueue_block_editor_assets', array($this, 'register') );
		}
	}

	/**
	 * Register additional attributes for navigation-link block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		// You can direct the icon to be a specific one off file.
		if ( ! array_key_exists( 'iconId', $metadata['attributes'] ) ) {
			$metadata['attributes']['iconId'] = array(
				'type'    => 'integer'
			);
		}
		// Otherwise, if you have an icon library you'd like to add you can add that here.
		// There are multiple ways you could add your icon from this attribute.
		// One way would be to use this slug to get a specific SVG from your library and then output that,
		// or you could use it to add a classname to the icon and use a CSS based library to output the icon.
		if ( ! array_key_exists( 'iconSlug', $metadata['attributes'] ) ) {
			$metadata['attributes']['iconSlug'] = array(
				'type'    => 'string'
			);
		}

		return $metadata;
	}

	public function register() {
		self::$script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		wp_enqueue_script( self::$script_handle );
	}

	public function render_callback() {

	}
}
