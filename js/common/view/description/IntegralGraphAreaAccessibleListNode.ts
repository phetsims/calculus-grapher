// Copyright 2026, University of Colorado Boulder

/**
 * IntegralGraphAreaAccessibleListNode is the accessible list that describes the Integral Graph.
 *
 * Note most of the code and PhET-iO API use the term "Integral Graph", while core description uses
 * "Integral Graph Area". Since this code is specific to core description, we use that terminology herein.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import GraphAreaAccessibleListNode from './GraphAreaAccessibleListNode.js';

export default class IntegralGraphAreaAccessibleListNode extends GraphAreaAccessibleListNode {

  public constructor( integralCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      IntegralGraphAreaAccessibleListNode.getIntegralCurveListItem( integralCurveVisibleProperty ),
      GraphAreaAccessibleListNode.getCoordinateGridListItem( gridVisibleProperty ),
      GraphAreaAccessibleListNode.getValuesListItem()
    ];

    super( listItems );
  }

  /**
   * Gets the list item that describes the integral curve.
   */
  private static getIntegralCurveListItem( integralCurveVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const dependencies = _.uniq( [

      // Description choices.
      ...CalculusGrapherFluent.a11y.graphAreas.integral.accessibleList.continuous.getDependentProperties(),
      CalculusGrapherFluent.a11y.graphAreas.integral.accessibleList.hiddenStringProperty,

      // Values used in the above descriptions.
      CalculusGrapherSymbols.accessibleVariableSymbolProperty,
      integralCurveVisibleProperty
    ] );

    const stringProperty = DerivedStringProperty.deriveAny( dependencies,
      () => {
        let string: string;
        if ( integralCurveVisibleProperty.value ) {
          string = CalculusGrapherFluent.a11y.graphAreas.integral.accessibleList.continuous.format( {
            variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value
          } );
        }
        else {
          // Hidden
          string = CalculusGrapherFluent.a11y.graphAreas.integral.accessibleList.hiddenStringProperty.value;
        }
        return string;
      } );

    return {
      stringProperty: stringProperty
    };
  }

}

calculusGrapher.register( 'IntegralGraphAreaAccessibleListNode', IntegralGraphAreaAccessibleListNode );