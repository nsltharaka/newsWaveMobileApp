import axios from "axios";
import isUrlHttp from "is-url-http";
import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  ignoreDeclaration: true,
});

const validateURL = async (url) => {
  // syntax validation
  if (!isUrlHttp(url)) {
    return [false, "url syntax error"]
  }

  // status validation
  const baseURL = `http://validator.w3.org/feed/check.cgi?url=${url}&output=soap12`

  try {
    const response = await axios.get(baseURL, xml, {
      timeout: 5000
    });

    const data = parser.parse(response.data)
    const validity = extractValue("m:validity", data)

    return [validity, validity ? "" : "Not a valid RSS feed"]

  } catch (error) {
    const errorMsg = "This could be due to an invalid url or problems with your network connection"
    return [false, errorMsg]
  }
}

const extractValue = (key, obj) => {

  if (key in obj) {
    return obj[key]
  }

  const keys = Object.keys(obj)

  for (k of keys) {
    if (typeof obj[k] === 'object') {
      return extractValue(key, obj[k]);
    }
  }

}

export default validateURL

const xml = `<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
<env:Body>
<m:feedvalidationresponse 
  env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" 
  xmlns:m="http://www.w3.org/2005/10/feed-validator">
      <m:uri>http://www.w3.org/QA/news.rss</m:uri> 
      <m:checkedby>http://qa-dev.w3.org/feed/check.cgi</m:checkedby>
      <m:date>2005-11-11T11:48:24.491627</m:date>
      <m:validity>false</m:validity>
  <m:errors>
    <m:errorcount>2</m:errorcount>
      <m:errorlist>
        <error>
          <level>error</level>
          <type>MissingDescription</type>
          <line>23</line>
          <column>0</column>
          <text>Missing channel element: description</text>
          <msgcount>1</msgcount>
          <backupcolumn>0</backupcolumn>
          <backupline>23</backupline>
          <element>description</element>
          <parent>channel</parent>
        </error>
      </m:errorlist>
  </m:errors>
  <m:warnings>
      <m:warningcount>0</m:warningcount>
	  <m:warninglist></m:warninglist>
  </m:warnings>
  <m:informations>
	<m:infocount>0</m:infocount>
	<m:infolist></m:infolist>
  </m:informations>
</m:feedvalidationresponse>
</env:Body>
</env:Envelope>`