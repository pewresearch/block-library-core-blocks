<?php
// Need to register a style that will change the sub menu to a sub-tree
// Also need a style that will change the sub menu to an expand button (more + | less -)
// one style should change the sub menu to like a sub tree view
// attribute toggle to allow for changing the url to a hashed url when you open a sub menu so a visitor can share that pre-opened.
//// ability to set a icon which would hide the label and show the icon instead.
// A new sub  block or ability for navigation links to also have an expand button, i guess this is similair to sub tree view but styled slightly different.

class Navigation_Submenu extends PRC_Core_Block_Library {
	public static $block_name = 'core/navigation-submenu';
	public static $block_json = null;

	public static $sub_tree_style_handle = null;
	public static $sub_expand_style_handle = null;
	// public $enable_hi_fidelity = true;

	public function __construct($init = false) {
		if ( true === $init ) {
			// $block_json_file = PRC_CORE_BLOCK_LIBRARY_DIR . '/build/navigation-submenu/block.json';
			// self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			// self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
			self::$sub_tree_style_handle = apply_filters( 'prc_core_navigation_submenu_sub_tree_style_handle', 'prc-core-navigation-submenu-sub-tree' );
			self::$sub_expand_style_handle = apply_filters( 'prc_core_navigation_submenu_sub_expand_style_handle', 'prc-core-navigation-submenu-sub-expand' );

			add_action('wp_enqueue_scripts', array($this, 'register_stylesheets'));
			add_action('init', array($this, 'register_block_styles'));
		}
	}

	public function register_stylesheets() {

	}

	public function register_block_styles() {
		register_block_style(
			'core/navigation-submenu',
			array(
				'name'  => 'sub-tree',
				'label' => __( 'Sub Tree', 'prc-core-block-library' ),
				'style' => self::$sub_tree_style_handle
			)
		);

		register_block_style(
			'core/navigation-submenu',
			array(
				'name'  => 'sub-expand',
				'label' => __( 'Sub Expand', 'prc-core-block-library' ),
				'style' => self::$sub_expand_style_handle,
			)
		);
	}

	// public function register() {
	// 	self::$script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	// 	wp_enqueue_script( self::$script_handle );
	// 	do_action("qm/debug", $this->enable_hi_fidelity ? 'hi-fidelity' : 'lo-fidelity');
	// }

	public function render_callback() {

	}
}
