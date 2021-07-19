type Rule = {
  from: RegExp
  to: string
}

const compileRules = (ruleString: string, nullMarker: string): Rule[] => {
  const rules: Rule[] = []
  ruleString
    .split(/[\r\n]+/)
    .map((line) => line.split(/\t/))
    .filter(([, to]) => !!to)
    .forEach(([from, to]) => {
      rules.push({
        from: new RegExp(from, 'g'),
        to: to.replace(nullMarker, ''),
      })
    })
  return rules
}

const applyRules = (word: string, rules: Rule[]): string =>
  rules.reduce<string>(
    (accumulator, { from, to }) => accumulator.replace(from, to),
    word,
  )

export { applyRules, compileRules }
