<?php
class Heading extends PRC_Block_Library_Primitives {
	public static $block_name = 'core/heading';
	public static $block_json = null;
	public static $script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_PRIMITIVES_DIR . '/build/heading/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action('init', function(){
				self::$script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
			}, 10, 0);
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_action( 'enqueue_block_editor_assets', array($this, 'register') );
			add_filter( 'render_block', array($this, 'render_callback'), 10, 2 );
		}
	}

	/**
	 * Register additional attributes for heading block.
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( self::$block_name !== $metadata['name'] ) {
			return $metadata;
		}

		if ( ! array_key_exists( 'isChapter', $metadata['attributes'] ) ) {
			$metadata['attributes']['isChapter'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}
		if ( ! array_key_exists( 'altTocText', $metadata['attributes'] ) ) {
			$metadata['attributes']['altTocText'] = array(
				'type'    => 'string',
				'default' => '',
			);
		}
		return $metadata;
	}

	public function register() {
		wp_enqueue_script( self::$script_handle );
	}

	public function render_callback( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		if ( array_key_exists('isChapter', $block['attrs']) && true === $block['attrs']['isChapter'] ) {
			// regex add is-chapter="true" to the h element in $block_content.
			$block_content = preg_replace( '/<h([1-6])/', '<h$1 data-is-chapter="true"', $block_content );
		}

		return $block_content;
	}
}
