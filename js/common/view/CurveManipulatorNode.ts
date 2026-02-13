// Copyright 2025-2026, University of Colorado Boulder

/**
 * CurveManipulatorNode is a draggable point used to manipulate the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

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
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import calculusGrapher from '../../calculusGrapher.js';
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

    const options = optionize4<ShadedSphereNodeOptions, SelfOptions, ShadedSphereNodeOptions>()(
      {}, AccessibleDraggableOptions, {
        isDisposable: false,
        visibleProperty: visibleProperty,
        cursor: 'pointer',
        children: [ new TargetNode( 12, curveManipulator.color ) ]
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
    this.addAccessibleObjectResponse( this.describer.getAccessibleObjectResponseFocused() );
  }

  /**
   * Adds an accessible object response that describes the manipulator when it is moved.
   */
  public doAccessibleObjectResponseMoved( isFromDOM: boolean ): void {
    this.addAccessibleObjectResponse( this.describer.getAccessibleObjectResponseMoved( isFromDOM ) );
  }

  /**
   * Adds an accessible object response that describes the manipulator when it is grabbed or released with the keyboard.
   */
  public doAccessibleObjectResponseGrabbedReleased(): void {
    this.addAccessibleObjectResponse( this.describer.getAccessibleObjectResponseGrabbedReleased() );
  }
}

class TargetNode extends Node {

  public constructor( radius: number, color: TColor ) {
    super( {
      children: [
        new Circle( {
          radius: radius,
          stroke: color,
          lineWidth: 1
        } ),
        new Circle( {
          radius: radius / 2,
          stroke: color,
          lineWidth: 1
        } ),
        new Circle( {
          radius: radius / 8,
          fill: color
        } )
      ]
    } );
  }
}

calculusGrapher.register( 'CurveManipulatorNode', CurveManipulatorNode );