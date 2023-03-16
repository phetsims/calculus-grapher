// Copyright 2020-2023, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import optionize from '../../../../phet-core/js/optionize.js';
import CurveManipulationControls from './CurveManipulationControls.js';
import CurvePushButtonGroup from './CurvePushButtonGroup.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import PredictRadioButtonGroup from './PredictRadioButtonGroup.js';
import TransformedCurve from '../model/TransformedCurve.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {
  hasSmoothButton?: boolean; // should the 'Smooth' button be included in CurvePushButtonGroup?
};

export type CalculusGrapherControlPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class CalculusGrapherControlPanel extends Panel {

  private contentNode: Node; // the Node contained inside this Panel

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      predictSelectedProperty: Property<boolean>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      providedOptions: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      hasSmoothButton: true,

      // PanelOptions
      stroke: CalculusGrapherColors.panelStrokeProperty,
      fill: CalculusGrapherColors.panelFillProperty,
      cornerRadius: CalculusGrapherConstants.CORNER_RADIUS,
      xMargin: CalculusGrapherConstants.PANEL_X_MARGIN,
      yMargin: CalculusGrapherConstants.PANEL_Y_MARGIN,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    const predictRadioButtonGroup = new PredictRadioButtonGroup( predictSelectedProperty,
      options.tandem.createTandem( 'predictRadioButtonGroup' ) );

    // create controls associated with curve manipulation (slider and display) as well as curve mode buttons
    const curveManipulationControls = new CurveManipulationControls( curveManipulationProperties,
      predictEnabledProperty, options.tandem.createTandem( 'curveManipulationControls' ) );

    // create yellow curve buttons associated with undo, erase and (optionally) smoothing the curve
    const pushButtonGroup = new CurvePushButtonGroup( interactiveCurveProperty, options.hasSmoothButton,
      options.tandem.createTandem( 'pushButtonGroup' ) );

    // assemble all the scenery nodes
    const contentNode = new VBox( {
      spacing: 12,
      children: [
        predictRadioButtonGroup,
        curveManipulationControls,
        pushButtonGroup
      ]
    } );

    super( contentNode, options );

    this.contentNode = contentNode;
  }
}
calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );
