const data = [{"policy_no":"P0824-MTI-INWS-04693296","policy_id":41149157,"quote_id":325944,"product_id":600460,"piid":102286,"cid":45095}]


const generateCurls = (entries) => {
  return entries
    .map((entry) => {
      const { quote_id, product_id, piid, cid } = entry;

      return (
        `${quote_id}\n` +
        `curl --location 'http://integration-api-service.digital-microservices.svc.cluster.local:80/int-api/eska/send-payment-details' --header 'accept: application/json' --header 'Content-Type: application/json' --data '{"piid":${piid},"quote_id":${quote_id},"product_id":"${product_id}","signal_name":"SEND_PAYMENT_DETAILS","cid":${cid}}'\n` +
        `curl --location 'http://integration-api-service.digital-microservices.svc.cluster.local:80/int-api/eska/generate-report' --header 'accept: application/json' --header 'Content-Type: application/json' --data '{"piid":${piid},"quote_id":${quote_id},"product_id":"${product_id}","signal_name":"SEND_PAYMENT_DETAILS","cid":596}'\n` +
        `curl --location 'http://integration-api-service.digital-microservices.svc.cluster.local:80/int-api/policy-issue/email/send' --header 'Content-Type: application/json' --data '{"piid":${piid},"quote_id":${quote_id},"product_id":"${product_id}","signal_name":"NIJM_UPLOAD_SIGNAL","cid":${cid}}'\n`
      );
    })
    .join("\n");
};

console.log(generateCurls(data));
