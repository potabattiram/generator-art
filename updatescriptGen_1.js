const data = [{"policy_no":"P0824-MTI-INWS-04693296","policy_id":41149157,"quote_id":325944,"product_id":600460,"piid":102286,"cid":45095}]

function generateUpdateQueries(data) {
  return data
    .map((item) => {
      return `
UPDATE DIGITAL."policy_audit"
SET
  "eska_policy_id" = '${item.policy_id}',
  "eska_policy_no" = '${item.policy_no}',
  "eska_response" = '{"PolicyID": ${item.policy_id},"PolicySegmantCode":"${item.policy_no}"}',
  "updated_at" = CURRENT_TIMESTAMP
WHERE "quote_id" = '${item.quote_id}';
      `;
    })
    .join("\n");
}

const queries = generateUpdateQueries(data);
console.log(queries);
