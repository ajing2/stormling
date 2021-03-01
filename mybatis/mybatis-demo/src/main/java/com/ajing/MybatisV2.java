package com.ajing;

import com.ajing.config.Configuration;
import org.apache.commons.dbcp.BasicDataSource;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.io.InputStream;
import java.util.List;
import java.util.Properties;

/**
 * @ClassName MybatisV2
 * @Description TODO
 * @Author lingxiangxiang
 * @Date 11:08 PM
 * @Version 1.0
 **/
public class MybatisV2 {

    private Configuration configuration = new Configuration();

    private String namespace;



    public static void main(String[] args) {
        // 加载mybatis-config.xml的配置文件
        loadXml("mybatis-configi.xml");
    }


    private void loadXml(String path) {
        //根据xml的路劲， 获取到对应的输入流
        InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(path);
        // 将流对象转换成Document对象
        Document document = createDocument(inputStream);
        // 根据获取到的Document对象， 按照语义格式解析document
        parseConfiguration(document.getRootElement());
    }

    private void parseConfiguration(Element rootElement) {
        Element environments = rootElement.element("environments");
        parseEnvironments(environments);

        Element mappers = rootElement.element("mappers");
        parseMappers(mappers);
    }

    private void parseMappers(Element mappers) {
        List<Element> list = mappers.elements("mapper");
    }

    private void parseEnvironments(Element environments) {
        String defaultValue = environments.attributeValue("default");
        List<Element> list = environments.elements("environment");
        for (Element element : list) {
            String id = element.attributeValue("id");
            if (id.equals(defaultValue)) {
                Element dataSource = element.element("dataSource");
                parseDataSource(dataSource);
            }
        }

    }

    private void parseDataSource(Element dataSource) {
        String type = dataSource.attributeValue("type");
        if ("DBCP".equals(type)) {
            BasicDataSource ds = new BasicDataSource();
            Properties properties = parseProperty(dataSource);
            ds.setDriverClassName(properties.getProperty("driver"));
            ds.setUrl(properties.getProperty("url"));
            ds.setUsername(properties.getProperty("username"));
            ds.setPassword(properties.getProperty("password"));
            configuration.setDataSource(ds);
        }
    }

    private Properties parseProperty(Element dataSource) {
        Properties properties = new Properties();

        List<Element> list = dataSource.elements("property");
        for (Element element : list) {
            String name = element.attributeValue("name");
            String value = element.attributeValue("value");
            properties.put(name, value);
        }
        return properties;
    }

    private Document createDocument(InputStream inputStream) {
        try {
            SAXReader saxReader = new SAXReader();
            Document document = saxReader.read(inputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
