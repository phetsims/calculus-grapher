// Copyright 2022, University of Colorado Boulder

/**
 * Scenery Node that displays a representation of curve mode being manipulated
 *
 * @author Martin Veillette
 */

import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Curve from '../model/Curve.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';

type SelfOptions = EmptySelfOptions;

type CurveManipulationDisplayOptions = SelfOptions & CurveNodeOptions;

export default class CurveManipulationDisplayNode extends CurveNode {

  public constructor( curveManipulationWidthProperty: NumberProperty,
                      curveManipulationModeProperty: EnumerationProperty<CurveManipulationMode>,
                      provideOptions?: CurveManipulationDisplayOptions ) {

    const options = optionize<CurveManipulationDisplayOptions, SelfOptions, CurveNodeOptions>()( {

      // super-class options
    }, provideOptions );

    const curve = new Curve( {
      pointsPerCoordinate: 2,
      tandem: options.tandem.createTandem( 'displayCurve' )
    } );

    // chart transform for the graph, the height and Y range will be updated later
    const chartTransform = new ChartTransform( {
      viewWidth: 100,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE
    } );

    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform, {} );

    super( curve, chartTransform, options );

    this.addChild( chartRectangle );
  }
}

calculusGrapher.register( 'CurveManipulationDisplayNode', CurveManipulationDisplayNode );
