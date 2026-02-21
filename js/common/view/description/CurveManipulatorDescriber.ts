// Copyright 2026, University of Colorado Boulder

/**
 * CurveManipulatorDescriber creates accessible responses for a curve manipulator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CurveManipulator from '../../model/CurveManipulator.js';

export default class CurveManipulatorDescriber {

  private readonly curveManipulator: CurveManipulator;

  public constructor( curveManipulator: CurveManipulator ) {
    this.curveManipulator = curveManipulator;
  }

  /**
   * Gets an accessible object response that describes the manipulator when it gets keyboard focus.
   */
  public getAccessibleObjectResponseFocused(): string {
    let response: string;
    const xDescription = toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    const yDescription = toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS );
    if ( this.curveManipulator.keyboardModeProperty.value === 'grabbed' ) {
      response = CalculusGrapherFluent.a11y.curveManipulators.defaults.accessibleObjectResponse.focusedGrabbed.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    else {
      response = CalculusGrapherFluent.a11y.curveManipulators.defaults.accessibleObjectResponse.focusedReleased.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    return response;
  }

  /**
   * Gets an accessible object response that describes the manipulator when it is moved.
   */
  public getAccessibleObjectResponseMoved( isFromPDOM: boolean ): string {
    let response: string;
    const xDescription = toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    const yDescription = toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS );
    if ( this.curveManipulator.keyboardModeProperty.value === 'grabbed' || !isFromPDOM ) {
      response = CalculusGrapherFluent.a11y.curveManipulators.defaults.accessibleObjectResponse.movedGrabbed.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    else {
      response = CalculusGrapherFluent.a11y.curveManipulators.defaults.accessibleObjectResponse.movedReleased.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    return response;
  }

  /**
   * Gets an accessible object response that describes the manipulator when it is grabbed or released with the keyboard.
   */
  public getAccessibleObjectResponseGrabbedReleased(): string {
    let response: string;
    const xDescription = toFixedNumber( this.curveManipulator.positionProperty.value.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    const yDescription = toFixedNumber( this.curveManipulator.positionProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS );
    if ( this.curveManipulator.keyboardModeProperty.value === 'grabbed' ) {
      response = CalculusGrapherFluent.a11y.curveManipulators.defaults.accessibleObjectResponse.grabbed.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    else {
      response = CalculusGrapherFluent.a11y.curveManipulators.defaults.accessibleObjectResponse.released.format( {
        x: xDescription,
        y: yDescription
      } );
    }
    return response;
  }
}

calculusGrapher.register( 'CurveManipulatorDescriber', CurveManipulatorDescriber );