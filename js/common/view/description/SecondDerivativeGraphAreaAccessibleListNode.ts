// Copyright 2026, University of Colorado Boulder

/**
 * SecondDerivativeGraphAreaAccessibleListNode is the accessible list that describes the Second Derivative Graph Area.
 *
 * Note most of the code and PhET-iO API use the term "Second Derivative Graph", while core description uses
 * "Second Derivative Graph Area". Since this code is specific to core description, we use that terminology herein.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import AccessibleList, { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import type { AccessibleTemplateValue } from '../../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import SecondDerivativeCurve from '../../model/SecondDerivativeCurve.js';
import GraphAreaDescriber from './GraphAreaDescriber.js';

export default class SecondDerivativeGraphAreaAccessibleListNode extends GraphAreaDescriber {

  public constructor( private readonly secondDerivativeCurve: SecondDerivativeCurve,
                      private readonly secondDerivativeCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {
    super( gridVisibleProperty );
  }

  /**
   * Gets the accessible template that describes the graph area.
   */
  public override getAccessibleTemplate(): TReadOnlyProperty<AccessibleTemplateValue> {
    return AccessibleList.createTemplate( {
      leadingParagraphStringProperty: CalculusGrapherFluent.a11y.graphAreas.defaults.accessibleList.leadingParagraphStringProperty,
      listItems: [
        this.getSecondDerivativeCurveListItem(),
        this.getCoordinateGridListItem(),
        this.getValuesListItem()
      ]
    } );
  }

  /**
   * Gets the list item that describes the second derivative curve.
   */
  private getSecondDerivativeCurveListItem(): AccessibleListItem {

    const stringProperty = new DerivedStringProperty( [

        // Description choices.
        CalculusGrapherFluent.a11y.graphAreas.secondDerivative.accessibleList.continuousStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.secondDerivative.accessibleList.discontinuousStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.secondDerivative.accessibleList.hiddenStringProperty,

        // Values used to select one of the above descriptions.
        this.secondDerivativeCurve.numberOfDiscontinuousPointsProperty,
        this.secondDerivativeCurveVisibleProperty
      ],
      (
        continuousString,
        discontinuousString,
        hiddenString,
        numberOfDiscontinuousPoints,
        secondDerivativeCurveVisible
      ) => {
        let string: string;
        if ( secondDerivativeCurveVisible ) {
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

calculusGrapher.register( 'SecondDerivativeGraphAreaAccessibleListNode', SecondDerivativeGraphAreaAccessibleListNode );