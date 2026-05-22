import { Jsona, SwitchCaseJsonMapper, SwitchCaseModelMapper } from 'jsona';

const jsona = new Jsona({
  jsonPropertiesMapper: new SwitchCaseJsonMapper({
    camelizeAttributes: true,
    camelizeRelationships: true,
    camelizeType: true,
    camelizeMeta: false
  }),

  modelPropertiesMapper: new SwitchCaseModelMapper({
    switchAttributes: true,
    switchRelationships: true,
    switchType: true
  })
});

export function normalizeJsonApi<T = any>(response: any): T {
  return jsona.deserialize(response) as T;
}
