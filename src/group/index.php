<?php
namespace PRC;

class Group extends PRC_Block_Library_Core_Blocks {
	public static $block_name = 'core/group';
	public static $block_json = null;
	public static $view_script_handle = null;
	public static $view_style_handle = null;
	public static $editor_script_handle = null;

	public function __construct($init = false) {
		if ( true === $init ) {
			$block_json_file = PRC_BLOCK_LIBRARY_CORE_BLOCKS_DIR . '/build/group/block.json';
			self::$block_json = wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
			self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );

			add_action( 'init', array($this, 'init_assets') );
			add_action( 'enqueue_block_editor_assets', array($this, 'register_editor_assets') );
			add_filter( 'block_type_metadata', array( $this, 'add_attributes' ), 100, 1 );
			add_filter( 'block_type_metadata_settings', array( $this, 'add_settings' ), 100, 2 );
			add_filter( 'render_block', array( $this, 'render' ), 10, 2 );
		}
	}

	public function init_assets() {
		self::$editor_script_handle = register_block_script_handle( self::$block_json, 'editorScript' );
		self::$view_script_handle   = register_block_script_handle( self::$block_json, 'viewScript' );
		self::$view_style_handle    = register_block_style_handle( self::$block_json, 'style' );
	}


	public function register_editor_assets() {
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

		if ( ! array_key_exists( 'isSticky', $metadata['attributes'] ) ) {
			$metadata['attributes']['isSticky'] = array(
				'type'    => 'boolean',
				'default' => false,
			);
		}

		// If you pass an ID to the block, it will be used as the anchor for when the mobile viewpoint is reached.
		if ( ! array_key_exists( 'responsiveAttachId', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveAttachId'] = array(
				'type'    => 'string',
			);
		}
		// If you pass a threshold it will be used for the mobile viewpoint attach. If not, the default is 640.
		if ( ! array_key_exists( 'responsiveThreshold', $metadata['attributes'] ) ) {
			$metadata['attributes']['responsiveThreshold'] = array(
				'type'    => 'integer',
				'default' => 640,
			);
		}

		return $metadata;
	}

	public function add_settings(array $settings, array $metadata) {
		if ( self::$block_name === $metadata['name'] ) {
			$settings['provides_context'] = array_merge(
				array_key_exists('provides_context', $settings) ? $settings['provides_context'] : array(),
				array(
					'core/group/isSticky' => 'isSticky',
					'core/group/responsiveAttachId' => 'responsiveAttachId',
					'core/group/responsiveThreshold' => 'responsiveThreshold',
				)
			);
		}
		return $settings;
	}

	public function render( $block_content, $block ) {
		if ( self::$block_name !== $block['blockName'] || is_admin() ) {
			return $block_content;
		}

		$is_sticky = is_array($block['attrs']) && array_key_exists('isSticky', $block['attrs']) ? $block['attrs']['isSticky'] : false;
		$responsive_attach_id = is_array($block['attrs']) && array_key_exists('responsiveAttachId', $block['attrs']) ? $block['attrs']['responsiveAttachId'] : false;
		$responsive_threshold = is_array($block['attrs']) && array_key_exists('responsiveThreshold', $block['attrs']) ? $block['attrs']['responsiveThreshold'] : false;

		if ( $is_sticky || $responsive_attach_id || $responsive_threshold ) {
			wp_enqueue_script( self::$view_script_handle );
			wp_enqueue_style( self::$view_style_handle );
		}

		$block_content = apply_filters( 'prc_group_block_content', $block_content, $block );

		if ( $is_sticky ) {
			$block_content = wp_sprintf(
				'<div class="prc-group-block--sticky">%s</div>',
				$block_content
			);
		}

		if ( $responsive_threshold && $responsive_attach_id ) {
			$id = md5($block_content);
			$block_content = wp_sprintf(
				'<div class="prc-group-block--responsive" data-return-id="%1$s" data-attach-id="%2$s" data-responsive-threshold="%3$s">%4$s</div>',
				$id,
				$responsive_attach_id,
				$responsive_threshold,
				$block_content
			);
		}

		return $block_content;
	}
}
