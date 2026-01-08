// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulatorNode is a draggable point used to manipulate the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurveManipulator from '../model/CurveManipulator.js';
import CurveManipulatorKeyboardListener from './CurveManipulatorKeyboardListener.js';

export default class CurveManipulatorNode extends InteractiveHighlighting( ShadedSphereNode ) {

  public readonly curveManipulator: CurveManipulator;

  public constructor(
    curveManipulator: CurveManipulator,
    predictSelectedProperty: TReadOnlyProperty<boolean>,
    chartTransform: ChartTransform,
    visibleProperty: TReadOnlyProperty<boolean>,
    tandem: Tandem ) {

    // Color matches the curve that is being manipulated.
    const mainColorProperty = new DerivedProperty( [
        predictSelectedProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ],
      ( predictSelected, predictCurveStroke, originalCurveStroke ) =>
        predictSelected ? predictCurveStroke : originalCurveStroke );

    const options = combineOptions<ShadedSphereNodeOptions>( {}, AccessibleDraggableOptions, {
      isDisposable: false,
      visibleProperty: visibleProperty,
      mainColor: mainColorProperty,
      cursor: 'pointer',
      accessibleName: CalculusGrapherFluent.a11y.curveManipulatorNode.accessibleNameStringProperty,
      accessibleHelpText: CalculusGrapherFluent.a11y.curveManipulatorNode.accessibleHelpTextStringProperty,
      tandem: tandem
    } );

    super( 2 * CalculusGrapherConstants.SCRUBBER_RADIUS, options );

    this.curveManipulator = curveManipulator;

    this.addLinkedElement( curveManipulator );

    const focusHighlightPath = new HighlightPath( Shape.bounds( this.localBounds.dilated( 5 ) ) );
    this.setFocusHighlight( focusHighlightPath );

    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Do we need a separate interactive highlight?
    const interactiveHighlightPath = new HighlightPath( Shape.bounds( this.localBounds.dilated( 5 ) ) );
    this.setInteractiveHighlight( interactiveHighlightPath );

    // Change the focus highlight lineDash to indicate whether moving the manipulator with the keyboard will also change the curve.
    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Do we also need to modify the interactive highlight? The mode is not relevant for pointer.
    curveManipulator.keyboardCurveManipulationEnabledProperty.link(
      keyboardCurveManipulationEnabled => focusHighlightPath.setDashed( keyboardCurveManipulationEnabled ) );

    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Is this desired behavior?
    // Whenever the manipulator gets focus, disable keyboard manipulation of the curve.
    this.focusedProperty.link( focused => {
      if ( focused ) {
        curveManipulator.keyboardCurveManipulationEnabledProperty.value = false;
      }
    } );

    // Toggle between positioning the manipulator and modifying the curve.
    this.addInputListener( new CurveManipulatorKeyboardListener( curveManipulator.keyboardCurveManipulationEnabledProperty,
      tandem.createTandem( 'keyboardListener' ) ) );

    // Move to the position of the curve manipulator.
    curveManipulator.positionProperty.link( position => {
      this.center = chartTransform.modelToViewPosition( position );
    } );

    // Object response when the manipulator gets focus.
    this.focusedProperty.lazyLink( focused => {
      focused && this.doAccessibleObjectResponse();
    } );
  }

  public doAccessibleObjectResponse(): void {
    this.addAccessibleObjectResponse( CalculusGrapherFluent.a11y.curveManipulatorNode.accessibleObjectResponse.format( {
      x: toFixedNumber( this.curveManipulator.positionProperty.value.x, 2 ),
      y: toFixedNumber( this.curveManipulator.positionProperty.value.y, 2 )
    } ) );
  }
}

calculusGrapher.register( 'CurveManipulatorNode', CurveManipulatorNode );