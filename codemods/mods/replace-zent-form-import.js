// 替换zent 老的Form import
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const rst = j(file.source)
    .find(j.ImportDeclaration, {
      source: { value: "zent" }
    })
    .forEach(importNode => {
      const specifiers = importNode.value.specifiers;
      const hasForm = specifiers.find(spec => {
        return spec.local.name === "Form";
      });
      importNode.value.specifiers = specifiers.filter(spec => {
        return spec.local.name !== "Form";
      });
      return hasForm
        ? j(importNode).insertBefore(
          j.importDeclaration([hasForm], j.literal("@zent/compat"))
        )
        : importNode;
    });
  return rst.toSource({ quote: 'single' });
}