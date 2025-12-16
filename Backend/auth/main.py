class Solution:
   
    def longestCommonPrefix(self, strs: list[str]) -> str:
        test=""
        votes=0
        tested ={}
        for i in range(len(strs)):
            for j in range(i+1,len(strs)):
                test=strs[i][:j]
                if(test ==strs[j][len(test)-1:len(test)]):
                   votes=votes+1
        tested[strs[i]]=votes
        print(tested)
        return max(tested,key=tested.get)

v = Solution()
print(v.maxArea([1,8,6,2,5,4,8,3,7]))
arr = [1,2,3,4,5]
print(arr[::-1])
print(v.longestCommonPrefix(["flower","flow","flight"]))