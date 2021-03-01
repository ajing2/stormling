package com.ajing.config;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * @ClassName Configuration
 * @Description TODO
 * @Author lingxiangxiang
 * @Date 11:36 PM
 * @Version 1.0
 **/
public class Configuration {
    private DataSource dataSource;

    private Map<String, MappedStatument> mappedStatumentMap = new HashMap<>();

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Map<String, MappedStatument> getMappedStatumentMap() {
        return mappedStatumentMap;
    }

    public void setMappedStatumentMap(Map<String, MappedStatument> mappedStatumentMap) {
        this.mappedStatumentMap = mappedStatumentMap;
    }
}
