<template>
  <div class="page-aueryQuoda">
    <div class="bxywform">
      <el-card>
        <el-form label-width="100px" :model="searchform" ref="searchform">
          <el-row class="human-form">
            <el-col :span="8">
              <el-form-item label="客户姓名" prop="name">
                <el-input size="mini" v-model.trim="searchform.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计息方式" prop="breath">
                <el-input size="mini" v-model.trim="searchform.breath"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款期限" prop="statusDays">
                <el-select size="mini" v-model="searchform.statusDays" placeholder="请选择借款期限范围">
                  <el-option
                    v-for="d in optionsDays"
                    :key="d.value"
                    :label="d.label"
                    :value="d.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款利率" prop="statusRate">
                <el-select size="mini" v-model="searchform.statusRate" placeholder="请选择借款利率范围">
                  <el-option
                    v-for="d in optionsRate"
                    :key="d.value"
                    :label="d.label"
                    :value="d.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放款金额" prop="statusMoney">
                <el-select size="mini" v-model="searchform.statusMoney" placeholder="请选择放款金额范围">
                  <el-option
                    v-for="d in optionsMoney"
                    :key="d.value"
                    :label="d.label"
                    :value="d.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放款状态" prop="status">
                <el-select size="mini" v-model="searchform.status" placeholder="请选择放款状态范围">
                  <el-option v-for="d in options" :key="d.value" :label="d.label" :value="d.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到账日期" prop="beginDate">
                <el-date-picker
                  size="mini"
                  v-model="searchform.beginDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择开始日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="至" prop="endDate">
                <el-date-picker
                  size="mini"
                  v-model="searchform.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button size="mini" type="primary" @click="submitForm()">搜索</el-button>
                <el-button size="mini" @click="resetForm('searchform')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="case-table">
      <el-card>
        <el-table
          :data="tableData"
          border
          size="mini"
          stripe
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%; height:100%;"
        >
          <el-table-column prop="reportCode" label="案件号" align="center"></el-table-column>
          <el-table-column prop="reportName" label="姓名" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="godetail(scope.row.reportCode)"
              >{{scope.row.reportName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="reportMoney" label="放款金额（元）" align="center"></el-table-column>

          <el-table-column prop="reportDay" label="借款期限（期数）" align="center"></el-table-column>

          <el-table-column prop="reportBreath" label="借款利率" align="center"></el-table-column>
          <el-table-column prop="reportWays" label="计息方式" align="center"></el-table-column>

          <el-table-column prop="reportStatus" label="放款状态" align="center"></el-table-column>
          <el-table-column prop="reportTime" label="到账日期" align="center"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="case-pagination">
          <el-pagination
            background
            style="text-align:center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchform.pageIndex"
            :page-sizes="[1,2,3,4]"
            :page-size="searchform.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="count"
          >
            <!--这是显示总共有多少数据-->
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      searchform: {
        name: "",
        breath: "",
        statusDays: "",
        statusRate: "",
        status: "",
        statusMoney: "",
        beginDate: "",
        endDate: "",
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      },
      options: [
        {
          label: "测试状态一",
          value: 1
        },
        {
          label: "测试状态二",
          value: 2
        }
      ],
      optionsDays: [
        {
          label: "测试状态一",
          value: 1
        },
        {
          label: "测试状态二",
          value: 2
        }
      ],
      optionsRate: [
        {
          label: "测试状态一",
          value: 1
        },
        {
          label: "测试状态二",
          value: 2
        }
      ],
      optionsMoney: [
        {
          label: "测试状态一",
          value: 1
        },
        {
          label: "测试状态二",
          value: 2
        }
      ],
      tableData: [
        {
          reportCode: "MS002647",
          reportName: "lock",
          reportMoney: "3000.00",
          reportDay: "6",
          reportBreat: "",
          reportWays: "",
          reportStatus: "",
          reportTime: "2019.01.24  15:31:35"
        }
      ]
    };
  },

  components: {},
  computed: {},

  beforeMount() {},

  mounted() {
    var data = {};
    this.load(data);
  },

  methods: {
    submitForm() {
      this.load(this.searchform);
    },
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(psize) {
      // 改变每页显示的条数
      this.searchform.pageSize = psize;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.searchform.pageIndex = 1;
      this.load(this.searchform);
    },

    // 初始页currentPage
    handleCurrentChange(pindex) {
      this.searchform.pageIndex = pindex;
      this.load(this.searchform);
    },
    godetail() {
      this.$router.push({
        path: "/details/detailContract"
      });
    },
    //初始化
    load(data) {
      // this.$axios({
      //   method: "post",
      //   url: this.$store.state.domain + "/manage/order/getAccountAuditList",
      //   data: data
      // }).then(
      //   response => {
      //     var res = response.data;
      //     if (res.code == 0) {
      //       this.tableData = res.detail.result.pageList;
      //       this.count = res.detail.result.count;
      //       this.searchform.pageIndex = res.detail.result.pageIndex;
      //       this.searchform.pageSize = res.detail.result.pageSize;
      //     }
      //   },
      //   error => {}
      // );
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.page-aueryQuoda {
  margin: 40px 5%;
  margin-top: 80px;
  .case-table {
    margin: 20px 0%;
    .case-pagination {
      margin-top: 30px;
    }
  }
}
</style>