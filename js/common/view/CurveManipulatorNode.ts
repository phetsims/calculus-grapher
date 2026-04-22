// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulatorNode is a draggable point used to manipulate the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Shape from '../../../../kite/js/Shape.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import { PressListenerEvent } from '../../../../scenery/js/listeners/PressListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CurveManipulationType from '../model/CurveManipulationType.js';
import CurveManipulator from '../model/CurveManipulator.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulatorDragListener from './CurveManipulatorDragListener.js';
import CurveManipulatorKeyboardListener from './CurveManipulatorKeyboardListener.js';
import CurveManipulatorDescriber from './description/CurveManipulatorDescriber.js';

type SelfOptions = EmptySelfOptions;

type CurveManipulatorNodeOptions = SelfOptions &
  PickRequired<ShadedSphereNodeOptions, 'tandem' | 'accessibleName' | 'accessibleHelpText'>;

export default class CurveManipulatorNode extends InteractiveHighlighting( Node ) {

  public readonly curveManipulator: CurveManipulator;
  public readonly curveDragListener: CurveManipulatorDragListener;
  private readonly describer: CurveManipulatorDescriber;

  public constructor( curveManipulator: CurveManipulator,
                      transformedCurve: TransformedCurve,
                      curveManipulationModeProperty: TReadOnlyProperty<CurveManipulationType>,
                      curveManipulationWidthProperty: TReadOnlyProperty<number>,
                      chartTransform: ChartTransform,
                      visibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: CurveManipulatorNodeOptions ) {

    const options = optionize4<CurveManipulatorNodeOptions, SelfOptions, ShadedSphereNodeOptions>()(
      {}, AccessibleDraggableOptions, {
        isDisposable: false,
        visibleProperty: visibleProperty,
        cursor: 'pointer',
        children: [ new TargetNode( 12, curveManipulator.color ) ],

        // From the design document:
        // The ariaRoleDescription of “movable button” is custom rather than a known and commonly-used descriptor
        // for screen reader users. The reason for adding a custom description is to hopefully provide a more explicit
        // understanding that the Curve Manipulator can be moved, even when off the curve. The interaction itself of
        // the Curve Manipulator is unusual in that it’s a two-step process of grabbing the curve using the Space bar.
        // The fact that you can move the manipulator even when it’s off the curve is not typical, and the fact that
        // the curve “jumps” to the manipulator when it's grabbed anywhere in the Graph Area is also unusual. Further,
        // you can create unique curves while the curve is grabbed. Conveying all of this information in a very short
        // accessibleName and accessibleHelpText was challenging, so the hope is that the combination of the name,
        // help text, and role-description will clarify the interaction pattern. The word “button” conveys the
        // meaning that you press it (which grabs the curve), while “movable” conveys the button can move around
        // before pressing it. Changing the ariaRoleDescription to “movable” only after it is grabbed conveys the
        // manipulator is movable but on the curve.
        accessibleRoleDescription: new DerivedStringProperty( [
            curveManipulator.keyboardModeProperty,
            CalculusGrapherFluent.a11y.curveManipulators.defaults.accessibleRoleDescription.movableStringProperty,
            CalculusGrapherFluent.a11y.curveManipulators.defaults.accessibleRoleDescription.movableButtonStringProperty
          ],
          ( keyboardMode, movableString, movableButtonString ) => keyboardMode === 'grabbed' ? movableString : movableButtonString
        )
      }, providedOptions );

    super( options );

    this.curveManipulator = curveManipulator;
    this.describer = new CurveManipulatorDescriber( this.curveManipulator );

    this.addLinkedElement( curveManipulator );

    const focusHighlightPath = new HighlightPath( Shape.bounds( this.localBounds.dilated( 5 ) ) );
    this.setFocusHighlight( focusHighlightPath );

    // Separate interactive highlight because (unlike focusHighlightPath) we don't want its lineDash to change.
    const interactiveHighlightPath = new HighlightPath( Shape.bounds( this.localBounds.dilated( 5 ) ) );
    this.setInteractiveHighlight( interactiveHighlightPath );

    // Change the focus highlight lineDash to indicate whether moving the manipulator with the keyboard will also change the curve.
    curveManipulator.keyboardModeProperty.link( keyboardMode => focusHighlightPath.setDashed( keyboardMode === 'grabbed' ) );

    // Whenever the manipulator gets focus, reset the keyboard manipulation mode to its initial state,
    // and add an accessible object response.
    this.focusedProperty.lazyLink( focused => {
      if ( focused ) {
        curveManipulator.keyboardModeProperty.reset();
        this.doAccessibleObjectResponseFocused();
      }
    } );

    // Move to the position of the curve manipulator.
    curveManipulator.positionProperty.link( position => {
      this.translation = chartTransform.modelToViewPosition( position );
    } );

    // Toggle between positioning the manipulator and modifying the curve.
    this.addInputListener( new CurveManipulatorKeyboardListener( this, options.tandem.createTandem( 'keyboardListener' ) ) );

    // Drag the manipulator with pointer or keyboard.
    this.curveDragListener = new CurveManipulatorDragListener( this, transformedCurve, chartTransform,
      curveManipulationModeProperty, curveManipulationWidthProperty,
      options.tandem // CurveManipulatorDragListener will create tandem.dragListener and tandem.keyboardDragListener.
    );
    this.addInputListener( this.curveDragListener );
  }

  /**
   * Forwards a press listener event to the drag listener. When the user clicks anywhere inside the chart rectangle,
   * this is used to start dragListener interaction from that location.
   */
  public forwardPressListenerEvent( event: PressListenerEvent ): void {
    if ( this.visible ) {
      this.curveDragListener.dragListener.press( event );
    }
  }

  /**
   * Adds an accessible object response that describes the manipulator when it gets keyboard focus.
   */
  private doAccessibleObjectResponseFocused(): void {
    this.addAccessibleObjectResponse( this.describer.getAccessibleObjectResponseFocused(), {
      interruptible: true, // see https://github.com/phetsims/calculus-grapher/issues/390
      alertDelay: 1000 // ms, see https://github.com/phetsims/calculus-grapher/issues/390#issuecomment-4068266165
    } );
  }

  /**
   * Adds an accessible object response that describes the manipulator when it is moved.
   */
  public doAccessibleObjectResponseMoved( isFromDOM: boolean ): void {
    this.addAccessibleObjectResponse( this.describer.getAccessibleObjectResponseMoved( isFromDOM ), {
      interruptible: true, // see https://github.com/phetsims/calculus-grapher/issues/390
      alertDelay: 1000 // ms, see https://github.com/phetsims/calculus-grapher/issues/390#issuecomment-4068266165
    } );
  }

  /**
   * Adds an accessible object response that describes the manipulator when it is grabbed or released with the keyboard.
   */
  public doAccessibleObjectResponseGrabbedReleased(): void {
    this.addAccessibleObjectResponse( this.describer.getAccessibleObjectResponseGrabbedReleased() );
  }
}

/**
 * TargetNode implements the look for the curve manipulator.
 */
class TargetNode extends Path {

  public constructor( radius: number, color: TColor ) {

    // Three concentric circles
    const shape = new Shape()
      .circle( 0, 0, radius )
      .newSubpath().circle( 0, 0, radius / 2 )
      .newSubpath().circle( 0, 0, radius / 8 );

    super( shape, {
      stroke: color,
      lineWidth: 1
    } );
  }
}
