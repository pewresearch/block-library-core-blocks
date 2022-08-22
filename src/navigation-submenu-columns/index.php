<?php
// Need to register a style that will change the sub menu to a sub-tree
// Also need a style that will change the sub menu to an expand button (more + | less -)
// one style should change the sub menu to like a sub tree view
// attribute toggle to allow for changing the url to a hashed url when you open a sub menu so a visitor can share that pre-opened.
//// ability to set a icon which would hide the label and show the icon instead.
// A new sub  block or ability for navigation links to also have an expand button, i guess this is similair to sub tree view but styled slightly different.

class Navigation_Submenu extends PRC_Block_Library_Primitives {
	public static $block_name = 'core/navigation-submenu';
	public static $block_json = null;
	public static $view_handle = null;
	public static $editor_script_handle = null;
	public static $editor_style_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/navigation-submenu/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_action( 'init', array($this, 'register_stylesheets'), 10 );
			add_action( 'init', array($this, 'register_block_styles'), 11 );
			add_filter( 'render_block', array($this, 'render_callback'), 10, 2 );
		}
	}

	public function register_editor_assets() {
		wp_enqueue_style( self::$editor_style_handle );
		wp_enqueue_script( self::$editor_script_handle );
	}

	public function register_stylesheets() {
		self::$view_handle = register_block_style_handle( self::$block_json, 'style' );
		self::$editor_style_handle = register_block_style_handle( self::$block_json, 'editorStyle' );
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
	}

	public function register_block_styles() {
		wp_enqueue_style( self::$view_handle );
		register_block_style(
			self::$block_name,
			array(
				'name'  => 'sub-tree',
				'label' => __( 'Sub Tree', 'prc-core-block-library' ),
				'style' => self::$view_handle,
			)
		);

		register_block_style(
			self::$block_name,
			array(
				'name'  => 'sub-expand',
				'label' => __( 'Sub Expand', 'prc-core-block-library' ),
				'style' => self::$view_handle,
			)
		);
	}

	/**
	 * Register additional attributes for navigation-submenu block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		// You can direct the icon to be a specific one off file.
		if ( ! array_key_exists( 'subExpandOpenedLabel', $metadata['attributes'] ) ) {
			$metadata['attributes']['subExpandOpenedLabel'] = array(
				'type'    => 'string',
				'default' => __( 'Less', 'prc-core-block-library' ),
			);
		}

		return $metadata;
	}

	public function modify_button_label_open_close($block_content, $block) {
		$label_closed = is_array($block['attrs']) && array_key_exists('label', $block['attrs']) ? $block['attrs']['label'] : false;
		$label_opened = is_array($block['attrs']) && array_key_exists('subExpandOpenedLabel', $block['attrs']) ? $block['attrs']['subExpandOpenedLabel'] : false;

		if ( false === $label_opened ) {
			return $block_content;
		}

		$pattern = '/<button aria-label="(.*)" class="wp-block-navigation-item__content wp-block-navigation-submenu__toggle" aria-expanded="false"><span class="wp-block-navigation-item__label">'.$label_closed.'<\/span><\/button>/';
		$replacement = '<button aria-label="Expandable submenu" class="wp-block-navigation-item__content wp-block-navigation-submenu__toggle" aria-expanded="false"><span class="wp-block-navigation-item__label"><span class="wp-block-navigation-submenu__label__closed">'.$label_closed.'</span><span class="wp-block-navigation-submenu__label__opened">'.$label_opened.'</span></span></button>';
		$replaced = preg_replace($pattern, $replacement, $block_content);
		return $replaced;
	}

	public function render_callback( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}
		$classname = is_array($block['attrs']) && array_key_exists('className', $block['attrs']) ? $block['attrs']['className'] : false;

		// The sub-expand style should modify its button to have an open and close state.
		if ( false !== $classname && false !== strpos($classname, 'is-style-sub-expand') ) {
			$block_content = $this->modify_button_label_open_close($block_content, $block);
		}

		return $block_content;
	}
}
