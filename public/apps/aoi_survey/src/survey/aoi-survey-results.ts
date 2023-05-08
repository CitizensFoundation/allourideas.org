import { css, html, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '../@yrpri/common/yp-image.js';
import { YpFormattingHelpers } from '../@yrpri/common/YpFormattingHelpers.js';
import { YpBaseElement } from '../@yrpri/common/yp-base-element.js';

@customElement('aoi-survey-results')
export class PromptCommunityHighScores extends YpBaseElement {
  @property({ type: Array })
  results!: AoiResultData[];

  @property({ type: Object })
  question!: AoiQuestionData;

  @property({ type: Object })
  earl!: AoiEarlData;

  async connectedCallback() {
    super.connectedCallback();
  }

  async fetchResults() {
    this.results = await window.aoiServerApi.getSurveyResults(this.earl.name);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('earl') && this.earl) {
      this.fetchResults();
    }
  }

  static get styles() {
    return [
      super.styles,
      css`
        .title {
          font-family: monospace;
          font-size: 22px;
          letter-spacing: 0.22em;
          line-height: 1.7;
          color: var(--md-sys-color-primary);
          background-color: var(--md-sys-color-on-primary);
          padding: 16px;
          margin-top: 32px;
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .profileImage {
          width: 50px;
          height: 50px;
          min-height: 50px;
          min-width: 50px;
          margin-right: 8px;
        }

        .row {
          padding: 12px;
          margin: 12px;
          border-radius: 16px;
          background-color: var(--md-sys-color-secondary);
          color: var(--md-sys-color-on-secondary);

          min-width: 350px;
          width: 550px;

          font-family: monospace;
          font-size: 16px;
          letter-spacing: 0.22em;
          line-height: 1.7;
          vertical-align: center;
        }

        .row[current-user] {
          background-color: var(--md-sys-color-primary);
          color: var(--md-sys-color-on-primary);
        }

        .column {
          padding: 8px;
        }

        .index {
          font-size: 22px;
        }

        .nickname {
          padding-bottom: 0;
        }

        .nameAndScore {
          width: 100%;
        }

        .score {
          padding-top: 2px;
        }
        @media (max-width: 1000px) {
          .title {
            font-size: 18px;
            letter-spacing: 0.15em;
            line-height: 1.5;
            margin-top: 16px;
          }

          .row {
            min-width: 300px;
            width: 300px;+
            margin: 16px;
          }
        }
      `,
    ];
  }

  renderRow(index: number, result: AoiResultData) {
    return html`
      <div
        class="row layout horizontal"

      >
        <div class="column index">${index + 1}.</div>
        <div class="layout horizontal center-center nameAndScore">
          <div class="layout vertical center-center">
            <div class="column nickname">${result.data}</div>
            <div class="column score">${YpFormattingHelpers.number(result.wins)} / ${YpFormattingHelpers.number(result.losses)}</div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return this.results ? html`
      <div class="topContainer layout vertical wrap center-center">
        <div class="title">${this.t("Results")}</div>
        ${this.results.map((result, index) => this.renderRow(index,result))}
      </div>
    ` : nothing;
  }
}
