module.exports = {
    // 'API_HOST': 'https://eli-api-dev.cf.wgdc-drn-01.cloud.uk.hsbc',
    'API_HOST': 'https://eli-api-uat.cf.wgdc-drn-01.cloud.uk.hsbc',
    'API_PROXY': 'http://localhost:4000/proxy',
    'WEB_ROOT': '/group-sfp-war/',
    'USE_API_PROXY': true,
    'USE_INTERNAL_API': true,

    //this is for https://eli-api-uat.cf.wgdc-drn-01.cloud.uk.hsbc
    'X-HSBC-Saml':'<saml:Assertion xmlns:saml="http://www.hsbc.com/saas/assertion"> (http://www.hsbc.com/saas/assertion%22%3E)<Signature><KeyAlias>E2E_TRUST_SAAS_AP01_BRTB1_ALIAS</KeyAlias><SignatureValue>IkEaSkWC40i9QsUCi0akIh1rKFS2f0x6FYS6sx1evYrCNMYPnFJpAJ4EYBSmxseX1HvVzDD/efaNUEFN/Obkta+vo9rohNQdkvI6wOPOgE9Sd4qtBOWgamHDqWqwJQadLGZsz8PCVyNFsOMgN1gYxb/Atgl3PM4Hav/dQCp2RaEjCcb7ONxai1SqvfhhV9AfkMKdW0o4cMTCqWKwClPJhPo5WcqNerCriBdObTqHf9XuGJALBod8ykAl+GORn5Kfbcx605D5aSGngLRv5Bwgp3zHfqQ/23JZXrolY282SBfa6xR4FfzWqxukSpMpJ2XDp1o3xRWz1rje8/BNiYtS8w==</SignatureValue></Signature><saml:Subject><saml:NameID>HK00301967683300</saml:NameID></saml:Subject><saml:Conditions NotBefore="2016-11-30T17:28:07.285Z" NotOnOrAfter="2016-11-30T17:29:07.285Z" /><saml:AttributeStatement><saml:Attribute Name="IP"><saml:AttributeValue>130.51.28.202</saml:AttributeValue></saml:Attribute><saml:Attribute Name="CAM"><saml:AttributeValue>30</saml:AttributeValue></saml:Attribute></saml:AttributeStatement></saml:Assertion>'

    //this is for https://eli-api-dev.cf.wgdc-drn-01.cloud.uk.hsbc
    // 'X-HSBC-Saml': '<saml:Assertion xmlns:saml="http://www.hsbc.com/saas/assertion"> (http://www.hsbc.com/saas/assertion%22%3E)<Signature><KeyAlias>E2E_TRUST_SAAS_NA01_DIT4_ALIAS</KeyAlias><SignatureValue>HHKXEt+GHtqSm46/Iq0sJx+nEpqgv5A+OVmjc57j/JTM1jtDtGDBNdE9EQwAo8Zye0YXSE0A2qNtE0EBneuxGFzCsTY/qbPnTMca9JzaNFFvKhxAJqTSKwQ+5Z5F1orzugaDpqfYITAyX8AEmxeulFu1DffyG8ecixPIePbDiL0rC0hi5pvWv1zwryYdaK/QzUkSQvpKntJlpt4XSnG7DGgksFw6LdoCxOHUOxH2LIqfmR+flGva1CwB7ulwMDDzj8tZtBoin1r58ADx4D0rUU1y6/nlLDR+S2O4DxZNiJzFfo8cxdOxYmNV2Z616RuqI1BO5RAHgnS/mU+lopSNxQ==</SignatureValue></Signature><saml:Subject><saml:NameID>IB1ib5793467</saml:NameID></saml:Subject><saml:Conditions NotBefore="2015-12-08T17:32:06.583Z" NotOnOrAfter="2015-12-08T17:33:06.583Z" ></saml:Conditions><saml:AttributeStatement><saml:Attribute Name="IP"><saml:AttributeValue>130.47.61.229</saml:AttributeValue></saml:Attribute><saml:Attribute Name="CAM"><saml:AttributeValue>30</saml:AttributeValue></saml:Attribute></saml:AttributeStatement></saml:Assertion>'
};
