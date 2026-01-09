// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulatorNode is a draggable point used to manipulate the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import CurveManipulator from '../model/CurveManipulator.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulatorDragListener from './CurveManipulatorDragListener.js';
import CurveManipulatorKeyboardListener from './CurveManipulatorKeyboardListener.js';

export default class CurveManipulatorNode extends InteractiveHighlighting( ShadedSphereNode ) {

  public readonly curveManipulator: CurveManipulator;
  public readonly curveDragListener: CurveManipulatorDragListener;

  public constructor( curveManipulator: CurveManipulator,
                      transformedCurve: TransformedCurve,
                      curveManipulationModeProperty: TReadOnlyProperty<CurveManipulationMode>,
                      curveManipulationWidthProperty: TReadOnlyProperty<number>,
                      chartTransform: ChartTransform,
                      visibleProperty: TReadOnlyProperty<boolean>,
                      tandem: Tandem ) {

    const options = combineOptions<ShadedSphereNodeOptions>( {}, AccessibleDraggableOptions, {
      isDisposable: false,
      visibleProperty: visibleProperty,
      mainColor: curveManipulator.color,
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
    curveManipulator.keyboardEditEnabledProperty.link( keyboardEditEnabled => focusHighlightPath.setDashed( keyboardEditEnabled ) );

    // Whenever the manipulator gets focus, reset the keyboard manipulation mode to its initial state,
    // and add an accessible object response.
    this.focusedProperty.lazyLink( focused => {
      if ( focused ) {
        curveManipulator.keyboardEditEnabledProperty.reset();
        this.doAccessibleObjectResponse();
      }
    } );

    // Move to the position of the curve manipulator.
    curveManipulator.positionProperty.link( position => {
      this.center = chartTransform.modelToViewPosition( position );
    } );

    // Toggle between positioning the manipulator and modifying the curve.
    this.addInputListener( new CurveManipulatorKeyboardListener( curveManipulator.keyboardEditEnabledProperty,
      tandem.createTandem( 'keyboardListener' ) ) );

    // Drag the manipulator with pointer or keyboard.
    this.curveDragListener = new CurveManipulatorDragListener(
      this,
      transformedCurve,
      chartTransform,
      curveManipulationModeProperty,
      curveManipulationWidthProperty,
      tandem // CurveManipulatorDragListener will create tandem.dragListener and tandem.keyboardDragListener.
    );
    this.addInputListener( this.curveDragListener );
  }

  /**
   * Forwards a press listener event to the drag listener.
   * @param event
   */
  public forwardPressListenerEvent( event: PressListenerEvent ): void {
    this.curveDragListener.dragListener.press( event );
  }

  /**
   * Adds an accessible object response that describes the current state of the manipulator.
   * This is called when the manipulator gets focus and when the manipulator is moved.
   */
  public doAccessibleObjectResponse(): void {
    this.addAccessibleObjectResponse( CalculusGrapherFluent.a11y.curveManipulatorNode.accessibleObjectResponse.format( {
      x: toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS ),
      y: toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
    } ) );
  }
}

calculusGrapher.register( 'CurveManipulatorNode', CurveManipulatorNode );