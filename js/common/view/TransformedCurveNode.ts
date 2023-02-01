// Copyright 2020-2023, University of Colorado Boulder

/**
 * TransformedCurveNode is a CurveNode sub-type for the main curve that the user interacts with and manipulates, which then
 * triggers a change in the model TransformedCurve's points.
 *
 * Like CurveNode, TransformedCurveNode is created at the start and persists for the lifetime of the simulation. Links
 * are left as-is and TransformedCurves are never disposed.
 *
 * @author Brandon Li
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveNode, { CurveNodeOptions } from './CurveNode.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CurveManipulationProperties from '../model/CurveManipulationProperties.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CueingArrowsNode from './CueingArrowsNode.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = EmptySelfOptions;

type TransformedCurveNodeOptions = SelfOptions & CurveNodeOptions;

export default class TransformedCurveNode extends CurveNode {

  // has this node ever been userDragged, used for tracking the visibility of the cueingArrows
  public readonly wasDraggedProperty: BooleanProperty;
  public readonly transformedCurve: TransformedCurve;

  public constructor( curve: TransformedCurve,
                      curveManipulationProperties: CurveManipulationProperties,
                      chartTransform: ChartTransform,
                      providedOptions?: TransformedCurveNodeOptions ) {

    const options = optionize<TransformedCurveNodeOptions, SelfOptions, CurveNodeOptions>()( {

      // CurveNodeOptions
      continuousLinePlotOptions: {
        cursor: 'pointer'
      }
    }, providedOptions );

    super( curve, chartTransform, options );

    this.transformedCurve = curve;

    this.wasDraggedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'wasDraggedProperty' ),
      phetioReadOnly: true
    } );

    // xPosition for cueing arrows in model coordinate
    const centerX = CalculusGrapherConstants.CURVE_X_RANGE.getCenter();

    // create cueing arrows, y position will be set later
    const cueingArrowsNode = new CueingArrowsNode( {
      center: chartTransform.modelToViewXY( centerX, 0 ),

      // cueing arrow should not be visible if this node is not enabled
      visibleProperty: new DerivedProperty( [ this.wasDraggedProperty, this.enabledProperty ],
        ( wasDragged, enabled ) => !wasDragged && enabled ),
      tandem: options.tandem.createTandem( 'cueingArrowsNode' )
    } );

    this.addChild( cueingArrowsNode );
  }

  /**
   * Reset all
   */
  public override reset(): void {
    super.reset();
    this.wasDraggedProperty.reset();
  }

  protected override updateCurveNode(): void {
    super.updateCurveNode();
  }
}

calculusGrapher.register( 'TransformedCurveNode', TransformedCurveNode );
