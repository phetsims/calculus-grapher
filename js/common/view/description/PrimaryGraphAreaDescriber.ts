// Copyright 2026, University of Colorado Boulder

/**
 * PrimaryGraphAreaDescriber is the accessible list that describes the Primary Graph Area.
 *
 * Note most of the code and PhET-iO API use the term "Primary Graph", while core description uses
 * "Primary Graph Area". Since this code is specific to core description, we use that terminology herein.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
import AccessibleList, { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleList.js';
import type { AccessibleTemplateValue } from '../../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import PredictCurve from '../../model/PredictCurve.js';
import PrimaryCurve from '../../model/PrimaryCurve.js';
import GraphAreaDescriber from './GraphAreaDescriber.js';

export default class PrimaryGraphAreaDescriber extends GraphAreaDescriber {

  public constructor( private readonly primaryCurve: PrimaryCurve,
                      private readonly predictCurve: PredictCurve,
                      private readonly primaryCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly predictCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly predictEnabledProperty: TReadOnlyProperty<boolean>,
                      private readonly showPrimaryCurveProperty: TReadOnlyProperty<boolean>,
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
        this.getPrimaryCurveListItem(),
        this.getPredictCurveListItem(),
        this.getCoordinateGridListItem(),
        this.getValuesListItem()
      ]
    } );
  }

  /**
   * Gets the bullet list item that describes the primary curve.
   */
  private getPrimaryCurveListItem(): AccessibleListItem {

    const stringProperty = new DerivedStringProperty( [

        // Description choices.
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.continuousAndDifferentiableStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.hasDiscontinuitiesStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.hasCuspsStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.hasDiscontinuitiesAndCuspsStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.hiddenStringProperty,

        // Values used to select one of the above descriptions.
        this.primaryCurve.numberOfDiscontinuousPointsProperty,
        this.primaryCurve.numberOfCuspPointsProperty,
        this.primaryCurveVisibleProperty
      ],
      (
        continuousAndDifferentiableString,
        hasDiscontinuities,
        hasCuspsString,
        hasDiscontinuitiesAndCusps,
        hiddenString,
        numberOfDiscontinuousPoints,
        numberOfCuspPoints,
        primaryCurveVisible
      ) => {
        let string: string;

        if ( primaryCurveVisible ) {
          if ( numberOfDiscontinuousPoints === 0 && numberOfCuspPoints === 0 ) {
            // Continuous and differentiable.
            string = continuousAndDifferentiableString;
          }
          else if ( numberOfDiscontinuousPoints > 0 && numberOfCuspPoints === 0 ) {
            // Not differentiable at one or more discontinuities.
            string = hasDiscontinuities;
          }
          else if ( numberOfDiscontinuousPoints === 0 && numberOfCuspPoints > 0 ) {
            // Continuous but not differentiable at one or more cusps.
            string = hasCuspsString;
          }
          else {
            // Not differentiable at one or more discontinuities and one or more cusps.
            affirm( numberOfDiscontinuousPoints > 0 && numberOfCuspPoints > 0 );
            string = hasDiscontinuitiesAndCusps;
          }
        }
        else {
          // Hidden
          string = hiddenString;
        }
        return string;
      } );

    return {
      stringProperty: stringProperty,
      visibleProperty: new DerivedProperty( [ this.predictEnabledProperty, this.showPrimaryCurveProperty ],
        ( predictEnabled, showPrimaryCurve ) => !predictEnabled || showPrimaryCurve )
    };
  }

  /**
   * Gets the bullet list item that describes the predict curve.
   */
  private getPredictCurveListItem(): AccessibleListItem {

    const primaryCurveStringProperty = new DerivedStringProperty( [

        // Description choices.
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.continuousAndDifferentiableStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.hasDiscontinuitiesStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.hasCuspsStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.hasDiscontinuitiesAndCuspsStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.hiddenStringProperty,

        // Values used in the above descriptions.
        this.predictCurve.numberOfDiscontinuousPointsProperty,
        this.predictCurve.numberOfCuspPointsProperty,
        this.predictCurveVisibleProperty,
        this.predictEnabledProperty
      ],
      (
        continuousAndDifferentiableString,
        hasDiscontinuities,
        hasCuspsString,
        hasDiscontinuitiesAndCusps,
        hiddenString,
        numberOfDiscontinuousPoints,
        numberOfCuspPoints,
        predictCurveVisible,
        predictEnabled
      ) => {

        let string: string;

        if ( predictCurveVisible && predictEnabled ) {
          if ( numberOfDiscontinuousPoints === 0 && numberOfCuspPoints === 0 ) {
            // Continuous and differentiable.
            string = continuousAndDifferentiableString;
          }
          else if ( numberOfDiscontinuousPoints > 0 && numberOfCuspPoints === 0 ) {
            // Not differentiable at one or more discontinuities.
            string = hasDiscontinuities;
          }
          else if ( numberOfDiscontinuousPoints === 0 && numberOfCuspPoints > 0 ) {
            // Continuous but not differentiable at one or more cusps.
            string = hasCuspsString;
          }
          else {
            // Not differentiable at one or more discontinuities and one or more cusps.
            affirm( numberOfDiscontinuousPoints > 0 && numberOfCuspPoints > 0 );
            string = hasDiscontinuitiesAndCusps;
          }
        }
        else {
          // Hidden
          string = hiddenString;
        }
        return string;
      } );

    return {
      stringProperty: primaryCurveStringProperty,
      visibleProperty: this.predictEnabledProperty
    };
  }
}

calculusGrapher.register( 'PrimaryGraphAreaDescriber', PrimaryGraphAreaDescriber );