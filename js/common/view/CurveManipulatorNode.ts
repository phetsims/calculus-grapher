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
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import CurveManipulator from '../model/CurveManipulator.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulatorDragListener from './CurveManipulatorDragListener.js';
import CurveManipulatorKeyboardListener from './CurveManipulatorKeyboardListener.js';

type SelfOptions = EmptySelfOptions;

type CurveManipulatorNodeOptions = SelfOptions &
  PickRequired<ShadedSphereNodeOptions, 'tandem' | 'accessibleName' | 'accessibleHelpText'>;

export default class CurveManipulatorNode extends InteractiveHighlighting( Node ) {

  public readonly curveManipulator: CurveManipulator;
  public readonly curveDragListener: CurveManipulatorDragListener;

  public constructor( curveManipulator: CurveManipulator,
                      transformedCurve: TransformedCurve,
                      curveManipulationModeProperty: TReadOnlyProperty<CurveManipulationMode>,
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

    this.addLinkedElement( curveManipulator );

    const focusHighlightPath = new HighlightPath( Shape.bounds( this.localBounds.dilated( 5 ) ) );
    this.setFocusHighlight( focusHighlightPath );

    // Separate interactive highlight because (unlike focusHighlightPath) we don't want its lineDash to change.
    const interactiveHighlightPath = new HighlightPath( Shape.bounds( this.localBounds.dilated( 5 ) ) );
    this.setInteractiveHighlight( interactiveHighlightPath );

    // Change the focus highlight lineDash to indicate whether moving the manipulator with the keyboard will also change the curve.
    curveManipulator.keyboardEditEnabledProperty.link( keyboardEditEnabled => focusHighlightPath.setDashed( keyboardEditEnabled ) );

    // Whenever the manipulator gets focus, reset the keyboard manipulation mode to its initial state,
    // and add an accessible object response.
    this.focusedProperty.lazyLink( focused => {
      if ( focused ) {
        curveManipulator.keyboardEditEnabledProperty.reset();
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
    this.curveDragListener = new CurveManipulatorDragListener(
      this,
      transformedCurve,
      chartTransform,
      curveManipulationModeProperty,
      curveManipulationWidthProperty,
      options.tandem // CurveManipulatorDragListener will create tandem.dragListener and tandem.keyboardDragListener.
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
   * Adds an accessible object response that describes the current state of the manipulator when it is moved.
   */
  public doAccessibleObjectResponseMoved( isFromPDOM: boolean ): void {
    let response: string;
    const xDescription = toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    const yDescription = toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS );
    if ( this.curveManipulator.keyboardEditEnabledProperty.value || !isFromPDOM ) {
      response = CalculusGrapherFluent.a11y.curveManipulator.accessibleObjectResponseMovedGrabbed.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    else {
      response = CalculusGrapherFluent.a11y.curveManipulator.accessibleObjectResponseMovedReleased.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    this.addAccessibleObjectResponse( response );
  }

  /**
   * Adds an accessible object response when the manipulator is grabbed or released with the keyboard.
   */
  public doAccessibleObjectResponseGrabRelease(): void {
    let response: string;
    const xDescription = toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    const yDescription = toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS );
    if ( this.curveManipulator.keyboardEditEnabledProperty.value ) {
      response = CalculusGrapherFluent.a11y.curveManipulator.accessibleObjectResponseGrabbed.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    else {
      response = CalculusGrapherFluent.a11y.curveManipulator.accessibleObjectResponseReleased.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    this.addAccessibleObjectResponse( response );
  }

  /**
   * Adds an accessible object response when the manipulator gets focus.
   */
  public doAccessibleObjectResponseFocused(): void {
    this.doAccessibleObjectResponseGrabRelease();
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