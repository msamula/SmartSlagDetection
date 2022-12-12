--GENERATED_CODE ONLY EDIT USER SECTIONS

-- #INFO#
-- Job: SlagDetection
-- Creation date: 12-02-22,09:44:35
-- Modified date: 12-05-22,10:18:47
-- MD5: f10165598a8835ff9d502a19397a2769
-- #END INFO#

--GENERATED_CODE DO NOT EDIT

eval_AOI_0 = Statistic["AOI_0"]
eval_AOI_1 = Statistic["AOI_1"]

--GENERATED_CODE_END

--USER_GLOBAL_CODE_START
local SlagSumOld = 0 + 273.15
local SlagSumNew = 0 + 273.15

local SumGesOld = 0 + 273.15
local SumGesNew = 0 + 273.15
--USER_GLOBAL_CODE_END

function evaluate()
    --USER_EVAL_PRE_START

    --USER_EVAL_PRE_END

    --GENERATED_CODE DO NOT EDIT

    Results["AOI_0_Area"] = eval_AOI_0:area()
    Results["AOI_0_Area_Bin"] = false
    Results["AOI_0_Result"] = eval_AOI_0:mean()
    Results["AOI_0_Result_Bin"] = false
    Results["AOI_1_Result"] = eval_AOI_1:mean()
    Results["AOI_1_Result_Bin"] = false
    Results["AOI_1_Count"] = eval_AOI_1:count()
    Results["AOI_1_Count_Bin"] = false
    Results["AOI_0_Count"] = eval_AOI_0:count()
    Results["AOI_0_Count_Bin"] = false
    Results["MaxTemp"] = eval_AOI_0:max()
    Results["MaxTemp_Bin"] = false
    Results["TotalSlag"] = eval_AOI_0:mean()
    Results["TotalSlag_Bin"] = false

    ---GENERATED_CODE_END

    --USER_EVAL_POST_START
    Results["AOI_0_Result"] = ((Results["AOI_0_Count"]:getValue() / Results["AOI_0_Area"]:getValue()) * 100) + 273.15
    Results["AOI_1_Result"] = ((Results["AOI_1_Count"]:getValue() / Results["AOI_0_Count"]:getValue()) * 100) + 273.15

    SlagSumNew = Results["AOI_1_Count"]:getValue()
    SlagSumOld = SlagSumNew + SlagSumOld

    SumGesNew = Results["AOI_0_Count"]:getValue()
    SumGesOld = SumGesNew + SumGesOld

    Results["TotalSlag"] = ((SlagSumOld / SumGesOld) * 100) +273.15
    --USER_EVAL_POST_END
end
