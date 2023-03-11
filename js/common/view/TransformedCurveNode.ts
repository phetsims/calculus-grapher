// Copyright 2020-2023, University of Colorado Boulder

/**
 * TransformedCurveNode is a CurveNode subclass for the main curve that the user interacts with and manipulates,
 * which then triggers a change in the model TransformedCurve's points.
 *
 * It is responsible for creating a cueing arrow that disappears after the user interacts with the curve
 *
 * Like CurveNode, TransformedCurveNode is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and TransformedCurves are never disposed.
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CueingArrowsNode from './CueingArrowsNode.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {

  // Whether this TransformedCurveNode is currently interactive.
  isInteractiveProperty: TReadOnlyProperty<boolean>;
};

type TransformedCurveNodeOptions = SelfOptions & CurveNodeOptions;

export default class TransformedCurveNode extends CurveNode {

  public readonly transformedCurve: TransformedCurve;

  public constructor( transformedCurve: TransformedCurve,
                      curveManipulationProperties: CurveManipulationProperties,
                      chartTransform: ChartTransform,
                      providedOptions: TransformedCurveNodeOptions ) {

    const options = providedOptions;

    super( transformedCurve, chartTransform, options );

    this.transformedCurve = transformedCurve;

    // Creates cueing arrows at the middle of the curve, centered at y=0.
    const cueingArrowsNodeTandem = options.tandem.createTandem( 'cueingArrowsNode' );
    const cueingArrowsNode = new CueingArrowsNode( {
      center: chartTransform.modelToViewXY( CalculusGrapherConstants.CURVE_X_RANGE.getCenter(), 0 ),

      // Cueing arrows should not be visible if this node is not interactive.
      // Do not instrument, see https://github.com/phetsims/calculus-grapher/issues/240#issuecomment-1452498549.
      visibleProperty: new DerivedProperty(
        [ transformedCurve.wasManipulatedProperty, options.isInteractiveProperty, this.inputEnabledProperty ],
        ( wasManipulated, isInteractive, inputEnabled ) => !wasManipulated && isInteractive && inputEnabled ),
      tandem: cueingArrowsNodeTandem,
      phetioDocumentation: 'Cueing arrows on curve, visible prior to curve being interacted with.'
    } );

    this.addChild( cueingArrowsNode );
  }
}

calculusGrapher.register( 'TransformedCurveNode', TransformedCurveNode );
