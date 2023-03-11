// Copyright 2023, University of Colorado Boulder

/**
 * LabeledPointsNode is the set of LabeledPointNode instances. Those instances are not instrumented for PhET-iO,
 * because everything that the PhET-iO client can change is in the model. So this class also provides a link to
 * the collection of LabeledPoint instances in the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import LabeledPoint from '../model/LabeledPoint.js';
import LabeledPointNode from './LabeledPointNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import LinkableElement from '../../../../tandem/js/LinkableElement.js';

export default class LabeledPointsNode extends Node {

  public constructor( labeledPoints: LabeledPoint[],
                      linkableElement: LinkableElement,
                      chartTransform: ChartTransform,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      curveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    // LabeledPointNode instances
    const labeledPointNodes = labeledPoints.map( labeledPoint =>
      new LabeledPointNode( labeledPoint, chartTransform, predictEnabledProperty, curveLayerVisibleProperty, {

        // LabeledPointNode instances are not instrumented. The entire PhET-iO API lives in the model.
        // See model.tools.labeledPoints and https://github.com/phetsims/calculus-grapher/issues/198
        tandem: Tandem.OPT_OUT
      } ) );

    super( {
      children: labeledPointNodes,
      tandem: tandem,
      phetioVisiblePropertyInstrumented: false
    } );

    // Link to model.tools.labeledPoints
    this.addLinkedElement( linkableElement, {
      tandem: tandem.createTandem( 'labeledPoints' )
    } );
  }
}

calculusGrapher.register( 'LabeledPointsNode', LabeledPointsNode );