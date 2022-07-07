export const BASE_ERROR_CSS = `
  kuc-base-error-1-3-2,
  kuc-base-error-1-3-2 *,
  :lang(en) kuc-base-error-1-3-2,
  :lang(en) kuc-base-error-1-3-2 * {
    font-family: "HelveticaNeueW02-45Ligh", Arial,
      "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
  :lang(ja) kuc-base-error-1-3-2,
  :lang(ja) kuc-base-error-1-3-2 * {
    font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
      sans-serif;
  }
  :lang(zh) kuc-base-error-1-3-2,
  :lang(zh) kuc-base-error-1-3-2 * {
    font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
      Hei, "Heiti SC", sans-serif;
  }
  kuc-base-error-1-3-2 {
    width: 100%;
    font-size: 14px;
    display: inline-table;
    vertical-align: top;
  }
  kuc-base-error-1-3-2[hidden] {
    display: none;
  }
  .kuc-base-error-1-3-2__error {
    line-height: 1.5;
    padding: 4px 18px;
    box-sizing: border-box;
    background-color: #e74c3c;
    color: #ffffff;
    margin: 8px 0px;
    word-break: break-all;
    white-space: normal;
  }
  .kuc-base-error-1-3-2__error[hidden] {
    display: none;
  }
`;