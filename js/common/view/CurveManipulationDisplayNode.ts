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
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ChartRectangle from '../../../../bamboo/js/ChartRectangle.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TransformedCurve from '../model/TransformedCurve.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Range from '../../../../dot/js/Range.js';

type SelfOptions = EmptySelfOptions;

type CurveManipulationDisplayOptions = SelfOptions & PickRequired<CurveNodeOptions, 'tandem'>;

export default class CurveManipulationDisplayNode extends CurveNode {

  public constructor( curveManipulationWidthProperty: NumberProperty,
                      curveManipulationModeProperty: EnumerationProperty<CurveManipulationMode>,
                      provideOptions?: CurveManipulationDisplayOptions ) {

    const options = optionize<CurveManipulationDisplayOptions, SelfOptions, CurveNodeOptions>()( {

      // super-class options
    }, provideOptions );

    const curve = new TransformedCurve( {
      pointsPerCoordinate: 3,
      tandem: options.tandem.createTandem( 'displayCurve' )
    } );

    const xCenter = CalculusGrapherConstants.CURVE_X_RANGE.getCenter();
    const yMax = 5;

    // chart transform for the graph, the height and Y range will be updated later
    const chartTransform = new ChartTransform( {
      viewWidth: 100,
      viewHeight: 40,
      modelXRange: CalculusGrapherConstants.CURVE_X_RANGE,
      modelYRange: new Range( -1, 6 )
    } );

    Multilink.multilink( [ curveManipulationModeProperty, curveManipulationWidthProperty ],
      ( mode, width ) => {

        curve.reset();

        // TODO explain
        const middlePosition = ( mode === CurveManipulationMode.TILT ) ?
                               new Vector2( xCenter, yMax / 2 ) :
                               new Vector2( xCenter, yMax );

        chartTransform.modelYRange = ( mode === CurveManipulationMode.SINE ) ?
                                     new Range( -6, 6 ) :
                                     new Range( -1, 6 );

        if ( mode === CurveManipulationMode.SINE ) {
          width = width / 2;
        }

        curve.transformedCurve( mode, width, middlePosition, middlePosition, middlePosition );

      }
    );

    // chart Rectangle for the graph
    const chartRectangle = new ChartRectangle( chartTransform, {} );

    super( curve, chartTransform, options );

    this.clipArea = chartRectangle.getShape();
    this.addChild( chartRectangle );
  }
}

calculusGrapher.register( 'CurveManipulationDisplayNode', CurveManipulationDisplayNode );
