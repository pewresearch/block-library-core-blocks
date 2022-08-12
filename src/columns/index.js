/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
	createBlock,
	registerBlockStyle,
	registerBlockVariation,
	rawHandler,
} from "@wordpress/blocks";
import { Fragment, useEffect, useRef } from "@wordpress/element";
import {
	InspectorControls,
	InspectorAdvancedControls,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import {
	TextControl,
	ToggleControl,
	CardDivider,
	PanelBody,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

console.log("Hello World -> src/column/index.js");

addFilter(
  "editor.BlockEdit",
  "prc-core-block-library/columns",
  createHigherOrderComponent(
    (BlockEdit) =>
      function ColumnsBlockAdvancedControls(props) {
        const { name, attributes, setAttributes, clientId } = props;
        if ("core/columns" !== name) {
          return <BlockEdit {...props} />;
        }

        const blockRef = document.getElementById(`block-${clientId}`);

        console.log("Columns Props: ", props, blockRef);

        const { fillViewportHeight } = attributes;

        useEffect(() => {
          // console.log("useEffect() blockRef: ", blockRef);
          // if (blockRef.current) {
          // 	blockRef.current.style.height = fillViewportHeight ? '100vh' : '';
          // }
        }, [fillViewportHeight]);

        return (
          <Fragment>
            <InspectorAdvancedControls>
              <ToggleControl
                label={__("Fill viewport height")}
                checked={fillViewportHeight}
                onChange={() => {
                  setAttributes({ fillViewportHeight: !fillViewportHeight });
                }}
              />
              <CardDivider />
            </InspectorAdvancedControls>
            <BlockEdit {...props} />
          </Fragment>
        );
      },
    "withColumnsBlockAdvancedControls"
  ),
  21
);
