// Copyright 2026, University of Colorado Boulder

/**
 * CurveManipulatorDescriber creates core descriptions for a curve manipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CurveManipulator from '../../model/CurveManipulator.js';

export default class CurveManipulatorDescriber {

  private readonly curveManipulator: CurveManipulator;
  private readonly curveManipulatorNode: Node;

  public constructor( curveManipulator: CurveManipulator, curveManipulatorNode: Node ) {
    this.curveManipulator = curveManipulator;
    this.curveManipulatorNode = curveManipulatorNode;
  }

  /**
   * Adds an accessible object response that describes the manipulator when it gets keyboard focus.
   */
  public doAccessibleObjectResponseFocused(): void {
    let response: string;
    const xDescription = toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    const yDescription = toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS );
    if ( this.curveManipulator.keyboardModeProperty.value === 'grabbed' ) {
      response = CalculusGrapherFluent.a11y.curveManipulator.accessibleObjectResponseFocusedGrabbed.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    else {
      response = CalculusGrapherFluent.a11y.curveManipulator.accessibleObjectResponseFocusedReleased.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    this.curveManipulatorNode.addAccessibleObjectResponse( response );
  }

  /**
   * Add an accessible object response that describes the manipulator when it is moved.
   */
  public doAccessibleObjectResponseMoved( isFromPDOM: boolean ): void {
    let response: string;
    const xDescription = toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    const yDescription = toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS );
    if ( this.curveManipulator.keyboardModeProperty.value === 'grabbed' || !isFromPDOM ) {
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
    this.curveManipulatorNode.addAccessibleObjectResponse( response );
  }

  /**
   * Adds an accessible object response that describes the manipulator when it is grabbed or released with the keyboard.
   */
  public doAccessibleObjectResponseGrabbedReleased(): void {
    let response: string;
    const xDescription = toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    const yDescription = toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS );
    if ( this.curveManipulator.keyboardModeProperty.value === 'grabbed' ) {
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
    this.curveManipulatorNode.addAccessibleObjectResponse( response );
  }
}

calculusGrapher.register( 'CurveManipulatorDescriber', CurveManipulatorDescriber );