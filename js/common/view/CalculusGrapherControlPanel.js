// Copyright 2020, University of Colorado Boulder

/**
 * Control Panel
 *
 * @author Brandon Li
 */

import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationModes from '../model/CurveManipulationModes.js';

class CalculusGrapherControlPanel extends Panel {

  /**
   * @param {Property.<CurveManipulationModes>} curveManipulationModeProperty
   * @param {Object} [options]
   */
  constructor( curveManipulationModeProperty, options ) {

    options = merge( {

      // {number} - the spacing between the content Nodes of the Panel
      contentSpacing: 7,



  // Panel-like Containers
      stroke: 'rgb( 190, 190, 190 )',
      fill: 'rgb( 240, 240, 240 )'

    }, options );

    // Make the panel a fixed width.
    assert && assert( options.minWidth === undefined, 'CalculusGrapherControlPanel sets minWidth' );
    assert && assert( options.maxWidth === undefined, 'CalculusGrapherControlPanel sets maxWidth' );
    // const panelWidth =  + 2 * options.xMargin;
    // options.minWidth = panelWidth;
    // options.maxWidth = panelWidth;

    //----------------------------------------------------------------------------------------

    // Create the content Node of the Control Panel.
    const contentNode = new VBox( { spacing: options.contentSpacing } );
    super( contentNode, options );

    // @protected {Node} - the content Node. This is referenced for layouting purposes in sub-classes.
    this.contentNode = contentNode;

    const buttons = [];
    CurveManipulationModes.VALUES.forEach( mode => {
      buttons.push( {
        value: mode,
        node: new Text( mode.toString() )
      } );
    } );

    const radioButtonGroup = new AquaRadioButtonGroup( curveManipulationModeProperty, buttons );

    this.contentNode.addChild( radioButtonGroup );
  }
}

calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
export default CalculusGrapherControlPanel;