*正如大多数框架一样，`Mybatis` 框架也提供了缓存！* 



## 分类

`Mybatis` 框架的缓存分为两个级别。



### 一级缓存

> **`Mybatis` 框架的一级缓存是默认是开启的。**

`Mybatis` 框架的一级缓存是基于 `PerpetualCache` 的 `HashMap` 本地缓存，默认是 **SqlSession** 级别的缓存，在  **SqlSession** 的生命周期内有效。当 **SqlSession** 关闭后，该 **SqlSession** 中所有的一级缓存会被清空。



### 二级缓存

> **`Mybatis` 框架的二级缓存是默认是关闭的，** 使用是需要在 `Mybatis` 核心配置文件中设置开启！

二级缓存是 **SqlSessionFactory** 级别的，其作用域超出 **SqlSession** 范围，缓存中的数据可以被所有 **SqlSession** 共享。



## 二级缓存使用方法

在 `Mybatis` 框架中使用二级缓存需要一下几个环节：

1. 在 `Mybatis` 框架的配置文件中设置全局开启二级缓存，代码如下

   ```xml
   <settings>
   	<setting name="cacheEnabled" value="true" />
   </settings>
   ```

2. 即使全局开启了二级缓存，默认情况下也是不使用二级缓存的。可以根据需要在 **SQL** 映射文件中（*Mapper.xml）中配置缓存，为当前 **namespace** 启用二级缓存，代码如下：

   ```xml
   <mapper namespace="com.k.dao.sysUser.SysUserMapper">
       <!-- 缓存配置 -->   
       <cache
       	eviction="FIFO"
       	flushInterval="60000"
       	size="512"	
        	readOnly="true" />
   	...
   </mapper>
   ```

   **cache** 元素中各种属性的作用介绍：

   - **eviction**：选择缓存回收策略，主要包括以下几种策略：
     - **LRU**：这是默认选项，最近最少回收，移除最长时间不被使用的缓存对象。
     - **FIFO**：先进先出，按照对象进入缓存的顺序来移除它们。
     - **SOFT**：软引用，移除基于垃圾回收器状态和软引用规则的对象。
     - **WEAK**：弱引用，更积极地一出基于垃圾回收器和弱引用规则的对象。
   - **flushInterval**：设定缓存刷新间隔，以毫秒（ms）为单位设定缓存多长时间自动刷新一次，默认不自动刷新。   
   - **size**：设定缓存中最多存放多少个对象，默认是1024.
   - **readOnly**：设定缓存数据是否只读。默认是 *false* ，表示缓存数据会用于读写操作，`Mybatis` 框架会返回缓存的副本以避免脏读；*true* 表示缓存数据只会用于读操作，`Mybatis` 框架会为所有从缓存中获取数据的操作返回缓存对象得实例，以获得更好的性能。 

3. 在 SQL 映射文件中配置支持二级缓存后，如需对个别查询进行调整，可以在 `select` 元素中单独设置，代码如下：

   ```xml
   <select id="gitUserList" resultType="sysuser" useCache="false">
   	...
   </select>
   ```

   

> **TIP**
>
> `Mybatis` 的核心是 SQL 管理，缓存并不是 `Mybatis` 所擅长的，所有应该采用 `Redis` 、`MongoDB`  等更专业的缓存技术会更加合理！



完结撒花！

> **技术有限，如有错误，还请多多指教，谢谢！！！**