package com.ajing.config;

import com.ajing.sqlsource.SqlSource;

/**
 * @ClassName MappedStatument
 * @Description TODO
 * @Author lingxiangxiang
 * @Date 11:39 PM
 * @Version 1.0
 **/
public class MappedStatument {

    private String statementId;

    private SqlSource sqlSource;

    private String statementType;

    private Class<?> parameerTypeClass;

    private Class<?> resultTypeClass;

    public MappedStatument(String statementId, SqlSource sqlSource, String statementType,
                           Class<?> parameerTypeClass, Class<?> resultTypeClass) {
        this.statementId = statementId;
        this.sqlSource = sqlSource;
        this.statementType = statementType;
        this.parameerTypeClass = parameerTypeClass;
        this.resultTypeClass = resultTypeClass;
    }


    public String getStatementId() {
        return statementId;
    }

    public void setStatementId(String statementId) {
        this.statementId = statementId;
    }

    public SqlSource getSqlSource() {
        return sqlSource;
    }

    public void setSqlSource(SqlSource sqlSource) {
        this.sqlSource = sqlSource;
    }

    public String getStatementType() {
        return statementType;
    }

    public void setStatementType(String statementType) {
        this.statementType = statementType;
    }

    public Class<?> getParameerTypeClass() {
        return parameerTypeClass;
    }

    public void setParameerTypeClass(Class<?> parameerTypeClass) {
        this.parameerTypeClass = parameerTypeClass;
    }

    public Class<?> getResultTypeClass() {
        return resultTypeClass;
    }

    public void setResultTypeClass(Class<?> resultTypeClass) {
        this.resultTypeClass = resultTypeClass;
    }
}
