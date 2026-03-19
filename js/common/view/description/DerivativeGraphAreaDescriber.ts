// Copyright 2026, University of Colorado Boulder

/**
 * DerivativeGraphAreaDescriber is the accessible list that describes the Derivative Graph Area.
 *
 * Note most of the code and PhET-iO API use the term "Derivative Graph", while core description uses
 * "Derivative Graph Area". Since this code is specific to core description, we use that terminology herein.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleList, { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import type { AccessibleTemplateValue } from '../../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import DerivativeCurve from '../../model/DerivativeCurve.js';
import GraphAreaDescriber from './GraphAreaDescriber.js';

export default class DerivativeGraphAreaDescriber extends GraphAreaDescriber {

  public constructor( private readonly derivativeCurve: DerivativeCurve,
                      private readonly derivativeCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {
    super( gridVisibleProperty );
  }

  /**
   * Gets the accessible template that describes the graph area.
   */
  public override getAccessibleTemplate(): TReadOnlyProperty<AccessibleTemplateValue> {
    return AccessibleList.createTemplateProperty( {
      leadingParagraphStringProperty: CalculusGrapherFluent.a11y.graphAreas.defaults.accessibleList.leadingParagraphStringProperty,
      listItems: [
        this.getDerivativeCurveListItem(),
        this.getCoordinateGridListItem(),
        this.getValuesListItem()
      ]
    } );
  }

  /**
   * Gets the list item that describes the derivative curve.
   */
  private getDerivativeCurveListItem(): AccessibleListItem {

    const stringProperty = new DerivedStringProperty( [

        // Description choices.
        CalculusGrapherFluent.a11y.graphAreas.derivative.accessibleList.continuousStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.derivative.accessibleList.discontinuousStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.derivative.accessibleList.hiddenStringProperty,

        // Values used to select one of the above descriptions.
        this.derivativeCurve.numberOfDiscontinuousPointsProperty,
        this.derivativeCurveVisibleProperty
      ],
      (
        continuousString,
        discontinuousString,
        hiddenString,
        numberOfDiscontinuousPoints,
        derivativeCurveVisible
      ) => {
        let string: string;
        if ( derivativeCurveVisible ) {
          if ( numberOfDiscontinuousPoints === 0 ) {
            // Continuous and differentiable.
            string = continuousString;
          }
          else {
            // Not differentiable at one or more discontinuities.
            string = discontinuousString;
          }
        }
        else {
          // Hidden
          string = hiddenString;
        }
        return string;
      } );

    return {
      stringProperty: stringProperty
    };
  }
}
