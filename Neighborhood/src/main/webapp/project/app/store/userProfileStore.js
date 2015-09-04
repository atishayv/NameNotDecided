Ext.define('Neighborhood.store.userProfileStore',{
	
	extend: 'Ext.data.Store',
	//singleton:true,
	config: {	
		model: 'Neighborhood.model.userProfileModel',
	    autoLoad : false,
	    proxy: {
	        type: 'memory',
	        reader: {
	            type: 'json'
	        }
	    },
	    data :[/*
	            { title: '1.  Roy and Ropes' ,
	            problemStatement : 'Roy has a rope of length L meters. This rope has several other ropes attached to it at the end of every meter (except for the end of the rope). At each meter there are two ropes attached to this main rope, lets call them upper and lower ropes. See the following example.<br><br><img src="resources/images/prob1Img1.png"></img><br><br>Roy lit the rope on fire from the left end. This fire burns down the rope by 1 meter/minute.Your task is to find how much time (in minutes) will the fire take to burn down the entire rope.',
	            Input : 'First line contains <b>T</b> - number of test cases.<br>First line of each test case contains <b>L</b> - length of the rope.<br>Second line of each test case contains <b>L-1</b> integers separated by space denoting lengths of all the upper ropes at each meter.<br>Third line of each test case contains <b>L-1</b> integers separated by space denoting lengths all the lower ropes at each meter.',
	            Output  : 'Output the <b>time (in minutes)</b> required to burn down the entire rope for each test case in a new line.',
	            Constraints : '1 ≤ T ≤ 10<br>2 ≤ L ≤ 1000000 <br>0 ≤ upper[i] ≤ 1000000 where 1 ≤ i ≤ L-1<br>0 ≤ lower[i] ≤ 1000000 where 1 ≤ i ≤ L-1',
	            sampleInput : '1<br>5<br>1 2 1 2<br>1 0 2 1',
	            sampleOutput : '6',
	            explanation : 'Follow the nature of fire. Note that after 1 min. Fire can go in all three directions. Hence after 2 mins fire burnt 1 meter in all 3 directions. Rest is explained in the image below. <br><br><img src="resources/images/prob1Img2.png"></img>',
	            testCases :["1 5 1 2 1 2 1 0 2 1","10 3 5 4 7 4 6 3 0 8 8 4 5 2 4 0 7 10 5 4 6 8 5 2 1 6 9 8 4 1 4 9 0 0 6 10 7 8 8 5 1 9 8 7 4 6 7 5 9 10 4 2 10 0 5 9 7 3 4 7 2 3 6 3 10 6 5 8 7 1 8 1 6 10 3 4 10 9 1 1 4 2 10 10 4 4 0 0 6 6 6 8 2 3 1 2 7 2 7 4 1 10 7 0 10 7 10 10 1 0 7 10 7 6 6 3 2 4 8 8 10 10 4 5 0","10 2 7 10 4 10 1 4 0 3 9 5 1 10 1 7 0 4 7 0 5 7 7 0 4 5 5 0 10 3 0 2 9 5 4 7 0 0 8 10 1 3 7 6 4 4 3 5 7 7 7 2 6 7 3 4 2 10 4"],
	            testCasesOutput : ["6<br>"]},
	            
    	        { title: '2.  Little Ashish and his wife',
	            problemStatement:'Little Ashish had no interest in studying ever in his life. So, he always wanted to marry as soon as possible, and kept forcing his parents to get him married. He thought his married life was going to be fun. But, well, surprise, surprise... its not - not for him, at least.<br><br>Fulfilling the demands of his wife is a huge problem for him. She wants costumes, a lot of them - and its getting impossible for Ashish to buy her all the clothes she asks for. Fortunately, for Ashish, he knows that out of n dresses, his wife only needs x different type of dresses. Now Ashish doesnt want to spend and waste a lot of time on this whole thing - so the only strategy he has decided to follow is to not follow any strategy - that is to say, he gets all the n dresses, and gifts them to his wife for her to figure out how many different dresses has he managed to bring.<br><br>Given the number of dresses, n, number of dresses he has to select, x - find out what his wife feels for him.',
	            Input:'In the first line, <i>tc</i> will denote the number of test cases. The next line will contain the number of total dresses, and the number of dresses he has to select for his wife. After which, there will be <i>n</i> integers, denoting the price of each dress.',
	            Output : 'If the wife had asked for x dresses, and she got <b>EXACTLY</b> x dresses, print "Perfect husband", if its more than what she had asked for, print "Lame husband", if its less than what she had demanded for, print "Bad husband."',
	            Constraints : '1 <= Test cases <= 50<br>1 <= N <= 13000<br>1 <= X <= 13000<br>1 <= Price <= 109',
	            sampleInput : '4<br>4 1<br>1 4 2 5<br>4 2<br>4 2 1 5<br>4 3<br>5 2 4 1<br>4 4<br>1 2 4 5',
	            sampleOutput : 'Lame husband<br>Lame husband<br>Lame husband<br>Perfect husband',
	            explanation : 'In the first case, since x = 1, we have to select only 1, so the difference would be 0 by default. When we have to select 4 out of 4, we can see the minimum difference would be (5-1==4) anyway.',
	            testCases :["4 4 1 1 4 2 5 4 2 4 2 1 5 4 3 5 2 4 1 4 4 1 2 4 5"],
	            testCasesOutput : ["Lame husband<br>Lame husband<br>Lame husband<br>Perfect husband<br>"]},
    	    */]
	}
});

