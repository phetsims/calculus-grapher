// Copyright 2020-2026, University of Colorado Boulder

/**
 * Control Panel at the middle-right of each screen that allows the user to manipulate certain Properties of
 * the simulation.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import CurveManipulator from '../model/CurveManipulator.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulationControls from './CurveManipulationControls.js';
import CurvePushButtonGroup from './CurvePushButtonGroup.js';
import PredictRadioButtonGroup from './PredictRadioButtonGroup.js';

type SelfOptions = {
  hasSmoothButton?: boolean; // should the 'Smooth' button be included in CurvePushButtonGroup?
};

export type CalculusGrapherControlPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class CalculusGrapherControlPanel extends Panel {

  public constructor( curveManipulationProperties: CurveManipulationProperties,
                      predictSelectedProperty: Property<boolean>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      interactiveCurveProperty: TReadOnlyProperty<TransformedCurve>,
                      curveManipulator: CurveManipulator,
                      providedOptions: CalculusGrapherControlPanelOptions ) {

    const options = optionize<CalculusGrapherControlPanelOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      hasSmoothButton: true,

      // PanelOptions
      isDisposable: false,
      stroke: CalculusGrapherColors.panelStrokeProperty,
      fill: CalculusGrapherColors.panelFillProperty,
      cornerRadius: CalculusGrapherConstants.CORNER_RADIUS,
      xMargin: CalculusGrapherConstants.PANEL_X_MARGIN,
      yMargin: CalculusGrapherConstants.PANEL_Y_MARGIN,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      accessibleHeading: CalculusGrapherFluent.a11y.headings.curveManipulationSettingsAndControlsStringProperty
    }, providedOptions );

    const predictRadioButtonGroup = new PredictRadioButtonGroup( predictSelectedProperty,
      options.tandem.createTandem( 'predictRadioButtonGroup' ) );

    // create controls associated with curve manipulation (slider and display) as well as curve mode buttons
    const curveManipulationControls = new CurveManipulationControls( curveManipulationProperties,
      predictEnabledProperty, options.tandem.createTandem( 'curveManipulationControls' ) );

    // create yellow curve buttons associated with undo, erase and (optionally) smoothing the curve
    const pushButtonGroup = new CurvePushButtonGroup( interactiveCurveProperty, curveManipulator,
      predictSelectedProperty, options.hasSmoothButton, options.tandem.createTandem( 'pushButtonGroup' ) );

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
  }
}
calculusGrapher.register( 'CalculusGrapherControlPanel', CalculusGrapherControlPanel );